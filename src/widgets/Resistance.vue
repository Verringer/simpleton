<template>
    <transition name="flash" mode="out-in">
        <WidgetBox title="Resistance" :key="resistance" :value="resistance"
            class="modern:bg-yellow-500 modern-dark:bg-yellow-600 flash" />
    </transition>
</template>

<script setup lang="ts">
import WidgetBox from '../components/WidgetBox.vue';

defineProps({
    resistance: Number
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