<script setup lang="ts">
  defineProps<{ title: string }>()
</script>

<template>
  <div class="py-4">
    <h2 class="uppercase text-xs text-gray-400 light:text-black fallout:text-green-700 font-semibold">{{ title }}</h2>
    <div class="py-2"></div>
    <slot/>
  </div>
</template>