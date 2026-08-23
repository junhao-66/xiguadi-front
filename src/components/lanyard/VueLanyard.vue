<template>
  <div ref="container" class="vue-lanyard-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Lanyard from './react/Lanyard.jsx';

const props = defineProps({
  position: { type: Array, default: () => [0, 0, 30] },
  gravity: { type: Array, default: () => [0, -40, 0] },
  fov: { type: Number, default: 20 },
  transparent: { type: Boolean, default: true },
  frontImage: { type: String, default: null },
  backImage: { type: String, default: null },
  imageFit: { type: String, default: 'cover' },
  lanyardImage: { type: String, default: null },
  lanyardWidth: { type: Number, default: 1 }
});

const container = ref(null);
let reactRoot = null;

const renderReact = () => {
  if (!container.value) return;
  if (!reactRoot) {
    reactRoot = ReactDOM.createRoot(container.value);
  }
  reactRoot.render(
    React.createElement(Lanyard, {
      position: props.position,
      gravity: props.gravity,
      fov: props.fov,
      transparent: props.transparent,
      frontImage: props.frontImage,
      backImage: props.backImage,
      imageFit: props.imageFit,
      lanyardImage: props.lanyardImage,
      lanyardWidth: props.lanyardWidth
    })
  );
};

onMounted(() => {
  renderReact();
});

watch(
  () => [props.position, props.gravity, props.fov, props.transparent, props.frontImage, props.backImage, props.imageFit, props.lanyardImage, props.lanyardWidth],
  () => {
    renderReact();
  },
  { deep: true }
);

onUnmounted(() => {
  if (reactRoot) {
    reactRoot.unmount();
    reactRoot = null;
  }
});
</script>

<style scoped>
.vue-lanyard-container {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>