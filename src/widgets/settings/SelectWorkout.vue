<template>
  <SettingBox title="Category">
    <div class="flex gap-4">
      <select class="w-full py-2 bg-transparent"
              v-bind:value="selectedCategory"
              v-on:input="$emit('update:selectedCategory', $event.target.value)">
        <option v-for="(option, index) in workoutCategories" :value="option.value">{{ option.label }}</option>
      </select>
      <button @click="previewWorkoutsVisible = !previewWorkoutsVisible">
        <IconGraphFilled class="w-6 h-6 hover:opacity-80"/>
      </button>
    </div>
  </SettingBox>
  <SettingBox title="Workout">
    <div class="flex gap-4">
      <select class="w-full py-2 bg-transparent"
              v-bind:value="selectedWorkout"
              v-on:input="$emit('update:selectedWorkout', $event.target.value)">
        <option v-for="(option, index) in workoutOptions" :value="option.value">{{ option.label }}</option>
      </select>
      <button @click="previewWorkoutsVisible = !previewWorkoutsVisible">
        <IconGraphFilled class="w-6 h-6 hover:opacity-80"/>
      </button>
    </div>
  </SettingBox>

  <!-- Overlay -->
  <div class="fixed inset-0 h-full w-full bg-black/80 z-50 items-center justify-center overflow-y-auto"
       v-if="previewWorkoutsVisible"
       @click="previewWorkoutsVisible = false">

    <!-- Categories  -->
    <div class="w-full py-24" @click.stop>
      <div class="flex mb-4 gap-4 mx-auto max-w-md justify-center">
        <div v-for="(category, index) in workoutCategories" :key="index"
             class="bg-gray-800 rounded-lg p-4 hover:bg-gray-900 cursor-pointer flex flex-wrap"
             :class="selectedCategory === category.value ? 'border-2 border-green-500' : ''"
             v-on:click="$emit('update:selectedCategory', category.value)">
          <div class="flex gap-4">
            <h3 class="text-white text-md">{{ category.label }}</h3>
          </div>
        </div>
      </div>

      <!-- Workouts -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full max-w-3xl px-4 mx-auto gap-4">
        <div v-for="(workout, index) in workouts[selectedCategory].workouts" :key="index"
             class="w-full bg-gray-800 rounded-lg p-4 hover:bg-gray-900 cursor-pointer flex flex-col justify-between gap-8"
             v-on:click="$emit('update:selectedWorkout', index); previewWorkoutsVisible = false">
          <h3 class="text-white text-xl">{{ workout.name }} -
            {{ new Date(workout.length * 1000).toISOString().substr(11, 8) }}</h3>
          <div class="w-full">
            <WorkoutTimelineMap :workout="workout"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, computed, ref} from 'vue';
import SettingBox from '../../components/SettingBox.vue';
import {workouts} from "../../workouts";
import {IconGraphFilled} from "@tabler/icons-vue";
import WorkoutTimelineMap from "../../components/WorkoutTimelineMap.vue";

defineProps({
  selectedCategory: String,
  selectedWorkout: String,
  workoutOptions: Array,
});

const previewWorkoutsVisible = ref(false);

const workoutCategories = computed(() => {
  return Object.keys(workouts).map((value) => {
    return {
      label: workouts[value].label,
      value: value
    }
  })
})
</script>