<template>
  <SettingBox title="Theme">
    <select class="w-full py-2 bg-transparent" @change="setTheme($event.target.value)" v-model="selectedTheme">
      <option value="">Dark (default)</option>
      <option value="oled">OLED Black</option>
      <option value="light">Light</option>
      <option value="fallout">Fallout</option>
      <option value="yellow">Black + Yellow</option>
      <option value="computer">Traditional Computer</option>
      <option value="modern">Modern ("Sigma Sport Evo" Inspired)</option>
      <option value="modern-dark">Modern Dark ("Sigma Sport Evo" Inspired)</option>
      <option value="night">Night</option>
    </select>
  </SettingBox>
</template>

<script setup lang="ts">
import { selectedTheme, setTheme } from '../../actions/theme.ts';
import SettingBox from '../../components/SettingBox.vue';
</script>