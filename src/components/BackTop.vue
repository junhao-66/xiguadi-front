<template>
  <Transition name="back-top-fade">
    <button
      v-if="visible"
      class="back-top"
      @click="scrollToTop"
      aria-label="回到顶部"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  threshold: { type: Number, default: 400 }
})

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > props.threshold
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.back-top {
  position: fixed; bottom: 32px; right: 32px; z-index: 900;
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--c-primary); color: #fff; border: none;
  box-shadow: 0 4px 16px rgba(1, 69, 242, 0.35);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}
.back-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 22px rgba(1, 69, 242, 0.5);
}
.back-top-fade-enter-active { transition: opacity 0.3s, transform 0.3s ease; }
.back-top-fade-leave-active { transition: opacity 0.25s, transform 0.25s; }
.back-top-fade-enter-from { opacity: 0; transform: translateY(12px); }
.back-top-fade-leave-to { opacity: 0; transform: translateY(8px); }

@media (max-width: 768px) {
  .back-top { bottom: 20px; right: 20px; width: 42px; height: 42px; }
}
</style>