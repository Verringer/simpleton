<template>
  <div class="relative pt-8">
    <div class="absolute top-0 bottom-0 border-red-500 border-l-2 pb-2"
         :style="{ left: `${(positionSecondsElapsed / selectedWorkout.length) * 100}%` }">
      <div class="group border-l-2 border-red-500 bg-red-500/40 px-1 py-1 text-sm font-bold uppercase
          text-red-300 light:text-red-800 computer:text-red-800 modern:text-red-800">
        <span class="opacity-80 hidden group-hover:inline-block font-semibold">Time left in segment: </span>
        -{{ new Date(timeLeftInSegment * 1000).toISOString().substr(14, 5) }}
      </div>
    </div>
    <WorkoutTimelineMap :workout="selectedWorkout"/>
  </div>
</template>

<script setup lang="ts">
import WorkoutTimelineMap from '../components/WorkoutTimelineMap.vue';
import {defineProps} from 'vue';

defineProps({
  positionSecondsElapsed: Number,
  selectedWorkout: String,
  timeLeftInSegment: Number
});
</script>