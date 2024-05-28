<template>
  <transition name="flash" mode="out-in">
    <WidgetContainer :key="position" class="modern:bg-yellow-500 modern-dark:bg-yellow-600">
      <div class="flex gap-x-4">
        <!-- Main area -->
        <div class="flex justify-between gap-x-8">

          <div class="">
            <div class="flex items-center">
              <h2
                class="uppercase min-w-[160px] text-xs text-gray-400 fallout:text-green-600 yellow:text-black/50 modern:text-black/50 modern-dark:text-white/80 font-semibold">
                Position</h2>
            </div>
            <div class="mt-2">
              <p
                class="text-white light:text-black fallout:text-green-500 yellow:text-black computer:text-[#666565] modern:text-black font-bold text-3xl uppercase">
                <HandlebarsPosition :position="position" />
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <HandlebarsIllustration :position="position" />
          </div>
        </div>
      </div>
    </WidgetContainer>
  </transition>
</template>

<script setup lang="ts">
import WidgetContainer from '../components/WidgetContainer.vue';
import HandlebarsPosition from '../components/HandlebarsPosition.vue';
import HandlebarsIllustration from '../components/HandlebarsIllustration.vue';

defineProps({
  position: String
});
</script>

<style scoped>
.flash-enter-active,
.flash-leave-active {
  animation: flash 5s linear infinite;
}

.flash-leave-to {
  opacity: 0;
  animation: none;
}

@keyframes flash {
  0% {
    opacity: 1;
  }

  10% {
    opacity: 0.2;
  }

  20% {
    opacity: 1;
  }

  30% {
    opacity: 0.2;
  }

  40% {
    opacity: 1;
  }

  50% {
    opacity: 0.2;
  }

  60% {
    opacity: 1;
  }

  70% {
    opacity: 0.2;
  }

  80% {
    opacity: 1;
  }

  90% {
    opacity: 0.2;
  }

  100% {
    opacity: 1;
  }
}
</style>