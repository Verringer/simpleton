<template>
    <SettingBox title="Connected Device">
      <!--Connected-->
      <div v-if="bluetoothDeviceName">
        <div class="flex items-center justify-between gap-2">
          <div class="flex group">
            <span>{{ bluetoothDeviceName }}</span>
            <!-- Disconnect -->
            <button class="group-hover:block hidden opacity-50 hover:opacity-100 w-5"
              @click="$emit('disconnect')">
              <IconLinkOff class="w-6" />
            </button>
          </div>
  
          <!-- Status -->
          <div class="">
            <div class="bg-green-500 h-3 w-3 rounded-full"></div>
          </div>
        </div>
      </div>
  
      <!-- Disconnected -->
      <div v-else>
        <Button @click="$emit('connect')">Connect via Bluetooth</Button>
      </div>
    </SettingBox>
  </template>
  
  <script setup lang="ts">
  import SettingBox from '../../components/SettingBox.vue';
  import Button from '../../components/Button.vue';
  import { IconLinkOff } from '@tabler/icons-vue';

  defineProps<{ bluetoothDeviceName: string }>()
  </script>