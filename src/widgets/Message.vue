<template>
  <transition name="fade">
    <div
        class="absolute w-full text-center text-5xl text-white fallout:text-green-500 computer:text-[#666565] modern:text-black font-bold my-8"
        :key="message">
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  message: String
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>