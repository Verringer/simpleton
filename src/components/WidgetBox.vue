<script setup lang="ts">
import WidgetContainer from "./WidgetContainer.vue";

defineProps<{
  title: string,
  value: string,
}>()
</script>

<template>
  <WidgetContainer>
    <div class="flex gap-x-4">
      <!-- Main area -->
      <div class="">
        <h2 class="uppercase text-xs text-gray-400 fallout:text-green-600 yellow:text-black/50 modern:text-black/50 modern-dark:text-white/80 font-semibold">
          {{
            title
          }}</h2>
        <div class="mt-2">
          <slot/>
          <p class="text-white light:text-black fallout:text-green-500 yellow:text-black computer:text-[#666565] modern:text-black modern-dark:text-white font-bold text-3xl uppercase">
            {{ value }}</p>
        </div>
      </div>
    </div>
  </WidgetContainer>
</template>