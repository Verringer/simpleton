<template>
  <div class="absolute inset-0 h-full w-full bg-black/80 z-50 flex items-center justify-center cursor-pointer"
    v-show="completeWorkoutModalVisible">
    <div class="z-30 w-full max-w-[900px] mx-auto px-2">
      <!--    Results -->
      <div class="bg-white p-8 rounded-lg text-black w-full cursor-default">
        <h2 class="text-4xl font-bold">Simpleton Workout Complete</h2>
        <div class="py-4"></div>
        <div class="md:flex gap-8">
          <div class="min-w-[300px] lg:min-w-[500px]">
            <p>You completed <b>{{ workouts[selectedCategory].label }}</b> -
              <b>{{ workouts[selectedCategory].workouts[selectedWorkout].name }}</b>
            </p>
            <div class="py-2"></div>
            <p>Total workout time: {{ new Date(lastWorkoutTime * 1000).toISOString().substr(11, 8) }}</p>
            <div class="py-2"></div>
            <p>Estimated calories burned: {{ Math.floor(lastWorkoutTime / 60 * 8.5) }} kcal (based on 8kcal/minute)</p>
            <div class="py-4"></div>
            <Button @click="setCompleteWorkoutModalVisible(false)">Start Another Workout</Button>
          </div>
          <hr class="md:hidden my-8">
          <div class="">
            <p>
              I wrote about my home spin bike set-up, inspiration for this project, and how to use it on my blog.
            </p>
            <div class="pt-1"></div>
            <p>
              <a href="https://verringer.com/simpleton" class="text-blue-500 hover:text-blue-600">
                Free Home Spin Bike Setup
              </a>
            </p>

            <div class="py-4"></div>
            <p>
              If you’d like to add your own workouts, submit a PR or issue on GitHub. This is an open source project,
              any contributions to the code-base are welcome, including features or theming.
            </p>
            <div class="flex items-center">
              <a href="https://github.com/verringer/simpleton" class="text-blue-500 hover:text-blue-600">
                @verringer/simpleton
              </a>
              <github-button href="https://github.com/verringer/simpleton" data-icon="octicon-star" class="mt-2 ml-4"
                aria-label="Star verringer/simpleton on GitHub">Star</github-button>
            </div>

            <div class="py-4"></div>
            <p>
              Made by Chris Verringer
            </p>
            <div class="flex gap-4 mt-2 text-blue-500">
              <a href="https://verringer.com" class="hover:text-blue-600" target="_blank">
                <IconWorld class="w-6" />
              </a>
              <a href="https://verringer.com/instagram" class="hover:text-blue-600" target="_blank">
                <IconBrandInstagram class="w-6" />
              </a>
              <a href="https://verringer.com/github" class="hover:text-blue-600" target="_blank">
                <IconBrandGithub class="w-6" />
              </a>
              <a href="https://verringer.com/linkedin" class="hover:text-blue-600" target="_blank">
                <IconBrandLinkedin class="w-6" />
              </a>
            </div>
          </div>
        </div>
        <div class="py-4"></div>
        <hr>
        <div class="py-4"></div>
        <div class="flex justify-between items-center gap-8">
          <div class="font-semibold opacity-60 flex items-center">
            <span class="mr-4">Share with friends</span>
            <IconArrowRight class="w-5 inline-block" stroke-width="2.5" />
          </div>
          <div class="flex gap-8">
            <!-- Twitter -->
            <a href="http://twitter.com/share?text=Just completed a spin workout via open-source workout web app: Simpleton!&url=https://verringer.github.io/simpleton"
              target="_blank" class="opacity-60 hover:opacity-100 transition-opacity duration-200 ease-in-out">
              <IconBrandTwitterFilled class="w-6" stroke-width="1" />
            </a>

            <!-- Facebook -->
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://verringer.github.io/simpleton" target="_blank"
              class="opacity-60 hover:opacity-100 transition-opacity duration-200 ease-in-out">
              <IconBrandFacebookFilled class="w-6" stroke-width="1" />
            </a>

            <!-- Email -->
            <a href="mailto:?subject=Check out Simpleton!&body=It's an open source spin bike workouts web app, compatible with all devices that have a web browser! Here's the link: https://verringer.github.io/simpleton"
              class="opacity-60 hover:opacity-100 transition-opacity duration-200 ease-in-out">
              <IconMailFilled class="w-6" stroke-width="1" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute h-full w-full z-20" @click="setCompleteWorkoutModalVisible(false)"></div>
    <div class="absolute h-full w-full z-10" id="fireworks"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../components/Button.vue';
import { IconBrandTwitterFilled, IconBrandFacebookFilled, IconMailFilled, IconArrowRight, IconWorld, IconBrandInstagram, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-vue';
import { Fireworks } from 'fireworks-js'
import GithubButton from 'vue-github-button'

defineProps({
  selectedCategory: String,
  selectedWorkout: String,
  lastWorkoutTime: Number,
  workouts: Object,
});

const emit = defineEmits(['update']);

let fireworks = null;
const completeWorkoutModalVisible = ref(false)

const setCompleteWorkoutModalVisible = (visible) => {
  if (visible) {
    completeWorkoutModalVisible.value = true

    const container = document.getElementById('fireworks')
    fireworks = new Fireworks(container, {
      maxRockets: 6,
      rocketSpawnInterval: 150,
      numParticles: 100,
      explosionMinHeight: 0.2,
      explosionMaxHeight: 0.9,
      explosionChance: 0.08
    })

    if (container) {
      fireworks.start()
    }
  } else {
    completeWorkoutModalVisible.value = false
    if (fireworks) {
      fireworks.stop(fireworks)
    }
  }
}

defineExpose({
  setCompleteWorkoutModalVisible
});

</script>