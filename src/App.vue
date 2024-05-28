<script setup lang="ts">
import {ref, onMounted, computed, watch} from 'vue';

// Components, styling
import WidgetBox from "./components/WidgetBox.vue";
import FalloutScanlines from "./assets/fallout-scanlines.svg";

// Widgets
import Map from "./widgets/Map.vue";
import Message from "./widgets/Message.vue";
import BluetoothDevice from "./widgets/settings/BluetoothDevice.vue";
import ThemeSelector from "./widgets/settings/ThemeSelector.vue";
import SelectWorkout from "./widgets/settings/SelectWorkout.vue";
import Controls from "./widgets/Controls.vue";
import Position from "./widgets/Position.vue";
import Resistance from './widgets/Resistance.vue';
import WorkoutComplete from "./widgets/WorkoutComplete.vue";

// Workouts
import {workouts} from "./workouts";

// Bluetooth
import {connectToBluetoothDevice, disconnectBluetoothDevice, bluetoothDeviceName, rpm} from './actions/bluetooth.ts'

// Prevent sleep
import {useWakeLock} from '@vueuse/core'
import TargetRPM from "./widgets/TargetRPM.vue";

const {isSupported, request} = useWakeLock()
onMounted(() => {
  if (isSupported.value) {
    request('screen')
  }
})

// Workouts
const selectedWorkout = ref(0)
const selectedCategory = ref('easy')

const workoutOptions = computed(() => {
  return workouts[selectedCategory.value].workouts.map((workout, index) => {
    return {
      label: workout.name,
      value: index
    }
  })
});

// Set to first workout in category, prevent null error
watch(selectedCategory, () => {
  if (workoutOptions.value.length > 0) {
    selectedWorkout.value = workoutOptions.value[0].value;
  }
});

// Overlays
const completeWorkoutOverlay = ref(null);

// Reactive variables
const actualSecondsElapsed = ref(0);
const positionSecondsElapsed = ref(0);
const timeRemaining = ref('-');
const timeElapsed = ref('-');
const targetRpm = ref("-");
const resistance = ref("-");
const stance = ref("Standing");
const position = ref("0");
const message = ref('Ready up + hit start');
const timeLeftInSegment = ref(0);

const lastWorkoutTime = ref(0);

let activeInterval: number | null | undefined = null;

// stop workout
const stopWorkout = () => {
  clearInterval(activeInterval);
  actualSecondsElapsed.value = 0;
  positionSecondsElapsed.value = 0;
  timeRemaining.value = '-';
  timeElapsed.value = '-';
  targetRpm.value = '-';
  resistance.value = '-';
  stance.value = 'Standing';
  position.value = '0';
  message.value = 'Ready up + hit start';
};

function getCurrentSection(workouts, selectedCategory: string, selectedWorkout: number, positionSecondsElapsed: number) {
  // Initialize the total duration
  let totalDuration = 0;

  // Initialize the current section
  let currentSection = null;

  // Iterate over the workout's segments
  for (let segment of workouts[selectedCategory].workouts[selectedWorkout].segments) {
    // Add the segment's duration to the total duration
    totalDuration += segment.duration;

    // If the total duration exceeds the elapsed time, the current segment is the current section
    if (totalDuration > positionSecondsElapsed) {
      currentSection = segment;
      break;
    }
  }

  return currentSection;
}

// getTimeLeftInSegment
function getTimeLeftInSegment(workouts, selectedCategory: string, selectedWorkout: number, positionSecondsElapsed: number) {
  // Initialize the total duration
  let totalDuration = 0;

  // Initialize the current section
  let currentSection = null;

  // Iterate over the workout's segments
  for (let segment of workouts[selectedCategory].workouts[selectedWorkout].segments) {
    // Add the segment's duration to the total duration
    totalDuration += segment.duration;

    // If the total duration exceeds the elapsed time, the current segment is the current section
    if (totalDuration > positionSecondsElapsed) {
      currentSection = segment;
      break;
    }
  }

  return totalDuration - positionSecondsElapsed;
}

// Start workout (supports pause/resume without resetting actualSecondsElapsed)
const startWorkout = () => {
  if (activeInterval) {
    clearInterval(activeInterval);
  }

  activeInterval = setInterval(() => {
    actualSecondsElapsed.value += 1;
    positionSecondsElapsed.value += 1;

    // Update time remaining
    const remaining = workouts[selectedCategory.value].workouts[selectedWorkout.value].length - positionSecondsElapsed.value;
    timeRemaining.value = remaining > 0 ? remaining : 0;

    // Update time elapsed
    timeElapsed.value = actualSecondsElapsed.value;

    // Check if workout is complete
    if (positionSecondsElapsed.value >= workouts[selectedCategory.value].workouts[selectedWorkout.value].length) {
      lastWorkoutTime.value = actualSecondsElapsed.value;
      stopWorkout()
      completeWorkoutOverlay.value.setCompleteWorkoutModalVisible(true);
    }

    const currentSection = getCurrentSection(workouts, selectedCategory.value, selectedWorkout.value, positionSecondsElapsed.value);

    targetRpm.value = currentSection.rpm;
    resistance.value = currentSection.resistance;
    stance.value = currentSection.stance;
    position.value = currentSection.position;
    message.value = currentSection.message;

    timeLeftInSegment.value = getTimeLeftInSegment(workouts, selectedCategory.value, selectedWorkout.value, positionSecondsElapsed.value);
  }, 1000);
};

// Pause workout
const pauseWorkout = () => {
  clearInterval(activeInterval);
};

// Seek workout
const seek = (seconds: string) => {
  // Convert the input to a number if it's a string
  const numSeconds = typeof seconds === 'string' ? parseInt(seconds) : seconds;

  // Adjust positionSecondsElapsed
  positionSecondsElapsed.value += numSeconds;

  // Make sure positionSecondsElapsed doesn't go below 0 or above totalDuration
  if (positionSecondsElapsed.value < 0) {
    positionSecondsElapsed.value = 0;
  } else if (positionSecondsElapsed.value > workouts[selectedCategory.value].workouts[selectedWorkout.value].length) {
    positionSecondsElapsed.value = workouts[selectedCategory.value].workouts[selectedWorkout.value].length;
  }

  // Update time remaining
  const remaining = workouts[selectedCategory.value].workouts[selectedWorkout.value].length - positionSecondsElapsed.value;

  timeRemaining.value = remaining > 0 ? remaining : 0;

  // time left in section
  timeLeftInSegment.value = getTimeLeftInSegment(workouts, selectedCategory.value, selectedWorkout.value, positionSecondsElapsed.value);

}

// Skip section
const skipFowardSection = (sections: any) => {
  // Get the current section
  const currentSection = getCurrentSection(workouts, selectedCategory.value, selectedWorkout.value, positionSecondsElapsed.value);

  // Get the index of the current section
  const currentSectionIndex = workouts[selectedCategory.value].workouts[selectedWorkout.value].segments.indexOf(currentSection);

  const totalSections = workouts[selectedCategory.value].workouts[selectedWorkout.value].segments.length;

  //   Get the next segment
  const nextSection = workouts[selectedCategory.value].workouts[selectedWorkout.value].segments[currentSectionIndex + 1];

  //   Add up all the sections durations to the segment we want
  const nextSectionDuration = workouts[selectedCategory.value].workouts[selectedWorkout.value].segments.slice(0, currentSectionIndex + 1).reduce((acc: any, segment: {
    duration: any;
  }) => acc + segment.duration, 0);

  //   Set the positionSecondsElapsed to the next section
  positionSecondsElapsed.value = nextSectionDuration;

  // Update time remaining
  const remaining = workouts[selectedCategory.value].workouts[selectedWorkout.value].length - positionSecondsElapsed.value;

  timeRemaining.value = remaining > 0 ? remaining : 0;

  targetRpm.value = nextSection.rpm;
  resistance.value = nextSection.resistance;
  stance.value = nextSection.stance;
  position.value = nextSection.position;
  message.value = nextSection.message;

  // Check if workout is complete
  if (positionSecondsElapsed.value >= workouts[selectedCategory.value].workouts[selectedWorkout.value].length) {
    stopWorkout()
    completeWorkoutOverlay.value.setCompleteWorkoutModalVisible(true);
  }
}

const skipBackwardSection = (sections: any) => {
  // Get the current section
  const currentSection = getCurrentSection(workouts, selectedCategory.value, selectedWorkout.value, positionSecondsElapsed.value);

  // Get the index of the current section
  const currentSectionIndex = workouts[selectedCategory.value].workouts[selectedWorkout.value].segments.indexOf(currentSection);

  const totalSections = workouts[selectedCategory.value].workouts[selectedWorkout.value].segments.length;

  //   Get the next segment
  const nextSection = workouts[selectedCategory.value].workouts[selectedWorkout.value].segments[currentSectionIndex - 1];

  //   Add up all the sections durations to the segment we want
  const nextSectionDuration = workouts[selectedCategory.value].workouts[selectedWorkout.value].segments.slice(0, currentSectionIndex - 1).reduce((acc: any, segment: {
    duration: any;
  }) => acc + segment.duration, 0);

  //   Set the positionSecondsElapsed to the next section
  positionSecondsElapsed.value = nextSectionDuration;

  // Update time remaining
  const remaining = workouts[selectedCategory.value].workouts[selectedWorkout.value].length - positionSecondsElapsed.value;

  timeRemaining.value = remaining > 0 ? remaining : 0;

  targetRpm.value = nextSection.rpm;
  resistance.value = nextSection.resistance;
  stance.value = nextSection.stance;
  position.value = nextSection.position;
  message.value = nextSection.message;
}
</script>

<template>
  <div
      class="h-full min-h-screen bg-[#242424] oled:bg-black light:bg-white fallout:bg-green-950 yellow:bg-black computer:bg-[#EEEEEE] computer:font-mono yellow:font-serif fallout:font-mono night:bg-gray-800 modern:bg-gray-100 modern:-tracking-[.1em] modern-dark:bg-black modern-dark:-tracking-[.1em]">
    <!-- Widgets -->
    <div class="p-4 flex flex-wrap gap-4 container mx-auto">
      <Position :position="position"/>
      <WidgetBox title="Time Elapsed" :value="new Date(actualSecondsElapsed * 1000).toISOString().substr(11, 8)"
                 min-w="300px" class="min-w-52"/>
      <WidgetBox title="Workout Time Remaining"
                 :value="new Date((typeof timeRemaining === 'number' && timeRemaining >= 0 ? timeRemaining : 0) * 1000).toISOString().substr(11, 8)"
                 min-w="600px" class="min-w-52"/>
      <TargetRPM :rpm="targetRpm"/>
      <WidgetBox title="Device RPM" :value="rpm" v-if="bluetoothDeviceName"
                 class="modern:bg-green-500 modern-dark:bg-green-600"/>
      <Resistance :resistance="resistance"/>
      <Controls :skipBackwardSection="() => skipBackwardSection" :seek="seek" :startWorkout="startWorkout"
                :pauseWorkout="pauseWorkout" :stopWorkout="stopWorkout" :skipFowardSection="skipFowardSection"/>
    </div>

    <!-- Message -->
    <div class="container mx-auto text-center relative w-full h-24">
      <Message :message="message"/>
    </div>

    <div class="py-8"></div>

    <!-- Map -->
    <div class="container mx-auto w-full pt-8">
      <Map :positionSecondsElapsed="positionSecondsElapsed"
           :selectedWorkout="workouts[selectedCategory].workouts[selectedWorkout]"
           :timeLeftInSegment="timeLeftInSegment"/>
    </div>

    <div class="py-4"></div>

    <!-- Settings -->
    <div
        class="border-t-2 border-gray-100/30 fallout:text-green-400 light:text-black computer:text-[#666565] modern:text-black container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SelectWorkout :selectedCategory="selectedCategory"
                       :selectedWorkout="selectedWorkout"
                       :workoutOptions="workoutOptions"
                       @update:selectedCategory="val => selectedCategory = val"
                       @update:selectedWorkout="val => selectedWorkout = val"/>
        <ThemeSelector/>
        <BluetoothDevice :bluetoothDeviceName="bluetoothDeviceName" @disconnect="disconnectBluetoothDevice"
                         @connect="connectToBluetoothDevice({ device: device, server: server, rpm: rpm })"/>
      </div>

    </div>
  </div>

  <!-- Fallout Overlay -->
  <div class="absolute inset-0 h-full hidden fallout:block pointer-events-none">
    <img :src="FalloutScanlines" class="h-full object-cover">
  </div>

  <WorkoutComplete
      :workouts="workouts"
      :selectedCategory="selectedCategory"
      :selectedWorkout="selectedWorkout"
      :lastWorkoutTime="lastWorkoutTime"
      ref="completeWorkoutOverlay"
  />

</template>