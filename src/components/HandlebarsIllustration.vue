<script setup lang="ts">

import HandlebarsPosition0 from "../assets/handlebars/0.svg";
import HandlebarsPosition1 from "../assets/handlebars/1.svg";
import HandlebarsPosition2 from "../assets/handlebars/2.svg";
import HandlebarsPosition25 from "../assets/handlebars/2.5.svg";
import HandlebarsPosition3 from "../assets/handlebars/3.svg";

const { position } = defineProps<{
  position: string | number
}>()
</script>

<template>
  <img :src="HandlebarsPosition0" alt="Handlebars position" class="w-12 h-12" v-if="position === '0' || position === 0" />
  <img :src="HandlebarsPosition1" alt="Handlebars position" class="w-12 h-12" v-else-if="position === '1' || position === 1" />
  <img :src="HandlebarsPosition2" alt="Handlebars position" class="w-12 h-12" v-else-if="position === '2' || position === 2" />
  <img :src="HandlebarsPosition25" alt="Handlebars position" class="w-12 h-12" v-else-if="position === '2.5' || position === 2.5" />
  <img :src="HandlebarsPosition3" alt="Handlebars position" class="w-12 h-12" v-else-if="position === '3' || position === 3" />
  <img :src="HandlebarsPosition0" alt="Handlebars position" class="w-12 h-12" v-else />
</template>