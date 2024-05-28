<template>
  <div class="flex items-end">
    <div v-for="block in workout.segments" :key="block.id"

    v-tooltip="{ content: 'Resistance: ' + block.resistance + ' <br />Duration: ' + block.duration + ' seconds <br />RPM: ' + block.rpm, html: true }"

    :style="{ height: `${block.resistance * 10}px`, width: `${(block.duration / totalDuration) * 100}%` }"
         :class="colorClass(block.resistance)"
         class="min-h-2 hover:bg-opacity-50">
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  workout: Object,
  elapsedTime: String
})

const totalDuration = computed(() => {
  return props.workout.segments.reduce((total, block) => total + block.duration, 0)
})

const colorClass = (resistance) => {
  switch (resistance) {
    case 1:
      return 'bg-gray-500 fallout:bg-green-100'
    case 2:
      return 'bg-blue-500 fallout:bg-green-200'
    case 3:
      return 'bg-yellow-400 fallout:bg-green-300'
    case 4:
      return 'bg-amber-500 fallout:bg-green-400'
    case 5:
      return 'bg-orange-600 fallout:bg-green-500'
    case 6:
      return 'bg-red-500 fallout:bg-green-600'
    case 7:
      return 'bg-red-700 fallout:bg-green-700'
    case 8:
      return 'bg-red-900 fallout:bg-green-800'
    case 9:
      return 'bg-black-500 fallout:bg-green-900'
    default:
      return 'bg-gray-300 fallout:bg-green-200/60'
  }
}
</script>