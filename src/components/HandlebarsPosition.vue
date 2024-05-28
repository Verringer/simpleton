<script setup lang="ts">
const {position} = defineProps<{
  position: string | number
}>()
</script>

<template>
  <p v-if="position === '0' || position === 0">No grip</p>
  <p v-else-if="position === '1' || position === 1">Centre</p>
  <p v-else-if="position === '2' || position === 2">Regular</p>
  <p v-else-if="position === '2.5' || position === 2.5">Wide</p>
  <p v-else-if="position === '3' || position === 3">Aero</p>
  <p v-else>No grip</p>
</template>