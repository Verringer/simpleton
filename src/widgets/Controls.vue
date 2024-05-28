<template>
  <WidgetBox title="Controls">
    <div class="flex items-center gap-x-2 yellow:text-black">
      <Button @click="skipBackwardSection">
        <IconArrowBackUp class="w-6" stroke-width="1.5" />
      </Button>

      <Button @click="seek('-30')">
        <IconPlayerTrackPrevFilled class="w-6" stroke-width="1.5" />
      </Button>

      <Button @click="startWorkout">
        <IconPlayerPlayFilled class="w-6" stroke-width="1.5" />
      </Button>

      <Button @click="pauseWorkout">
        <IconPlayerPauseFilled class="w-6" stroke-width="1.5" />
      </Button>

      <!-- Stop -->
      <Button @click="stopWorkout">
        <IconSquareFilled class="w-6" stroke-width="1.5" />
      </Button>

      <Button @click="seek('30')">
        <IconPlayerTrackNextFilled class="w-6" stroke-width="1.5" />
      </Button>

      <Button @click="skipFowardSection">
        <IconArrowForwardUp class="w-6" stroke-width="1.5" />
      </Button>
    </div>
  </WidgetBox>
</template>

<script setup lang="ts">
import WidgetBox from '../components/WidgetBox.vue';
import Button from '../components/Button.vue';
import { IconArrowBackUp, IconPlayerTrackPrevFilled, IconPlayerPlayFilled, IconPlayerPauseFilled, IconSquareFilled, IconPlayerTrackNextFilled, IconArrowForwardUp } from '@tabler/icons-vue';

defineProps({
  skipBackwardSection: Function,
  seek: Function,
  startWorkout: Function,
  pauseWorkout: Function,
  stopWorkout: Function,
  skipFowardSection: Function
});
</script>