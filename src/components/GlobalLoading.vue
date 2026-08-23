<template>
  <!--
    GlobalLoading — 全局加载组件
    功能：页面切换 / 图片加载时展示西高地动画 loading
    复用场景：全局遮罩加载
  -->
  <Transition name="loading-fade">
    <div v-if="visible" class="global-loading" :class="{ 'global-loading--full': fullscreen }">
      <div class="global-loading__overlay"></div>
      <div class="global-loading__body">
        <div class="global-loading__westie">
          <svg class="global-loading__dog" viewBox="0 0 120 90" fill="none">
            <!-- 身体 -->
            <ellipse cx="60" cy="42" rx="38" ry="32" fill="var(--color-bg-card)" stroke="var(--color-accent)" stroke-width="2.5"/>
            <!-- 头部 -->
            <circle cx="40" cy="32" r="18" fill="#fff" stroke="var(--color-accent)" stroke-width="2"/>
            <!-- 眼睛 -->
            <circle cx="37" cy="27" r="4.5" fill="var(--color-accent)"/>
            <circle cx="38.5" cy="25.5" r="1.5" fill="#fff"/>
            <!-- 鼻子 -->
            <ellipse cx="42" cy="34" rx="6" ry="4" fill="var(--color-accent)" opacity="0.4"/>
            <!-- 嘴 -->
            <ellipse cx="60" cy="52" rx="7" ry="4.5" fill="var(--color-accent)" opacity="0.6"/>
            <!-- 前腿 -->
            <path d="M22 44 L14 60" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M28 48 L20 66" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round"/>
            <!-- 后腿 -->
            <path d="M94 44 L102 60" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M88 48 L96 66" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round"/>
            <!-- 尾巴 -->
            <path d="M42 62 Q50 50 70 62" stroke="var(--color-accent)" stroke-width="2" fill="none" opacity="0.5"/>
            <!-- 耳朵 -->
            <ellipse cx="50" cy="20" rx="12" ry="14" fill="var(--color-accent)" opacity="0.12"/>
            <ellipse cx="56" cy="12" rx="8" ry="14" fill="var(--color-accent)" opacity="0.08"/>
          </svg>
        </div>
        <div class="global-loading__paws">
          <span v-for="i in 4" :key="i" class="global-loading__paw" :class="{ 'global-loading__paw--active': pawStates[i-1] }">🐾</span>
        </div>
        <p class="global-loading__text">{{ text }}</p>
        <div class="global-loading__dots">
          <span class="global-loading__dot" v-for="i in 3" :key="i" :style="{ animationDelay: (i * 0.18).toFixed(2) + 's' }"></span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  visible: { type: Boolean, default: false },
  text: { type: String, default: '正在加载中...' },
  fullscreen: { type: Boolean, default: true }
})

const pawStates = ref([0, 0, 0, 0])
let pawTimer = null

function animatePaws() {
  let step = 0
  pawTimer = setInterval(() => {
    step = (step + 1) % 4
    pawStates.value = [step === 0 ? 1 : 0, step === 1 ? 1 : 0, step === 2 ? 1 : 0, step === 3 ? 1 : 0]
  }, 400)
}

onMounted(() => animatePaws())
onBeforeUnmount(() => clearInterval(pawTimer))
</script>

<style scoped>
.global-loading { position: relative; z-index: 9999; }
.global-loading--full { position: fixed; inset: 0; }
.global-loading__overlay {
  position: absolute; inset: 0;
  background: rgba(1, 69, 242, 0.06);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.global-loading__body {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; min-height: 300px; padding: 40px 20px;
}
.global-loading--full .global-loading__body {
  min-height: 100vh; min-height: 100dvh;
}
.global-loading__dog {
  width: 140px; height: auto;
  animation: westie-bounce 0.8s ease-in-out infinite;
}
@keyframes westie-bounce {
  0%, 100% { transform: translateY(0); }
  30% { transform: translateY(-14px); }
  50% { transform: translateY(0); }
  70% { transform: translateY(-6px); }
}
.global-loading__paws {
  display: flex; gap: 12px; margin-bottom: 12px;
}
.global-loading__paw {
  font-size: 1.4rem; opacity: 0.25;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.global-loading__paw--active { opacity: 1; transform: scale(1.3); }
.global-loading__text {
  font-family: var(--c-font-serif); font-size: 1rem;
  color: var(--c-text); font-weight: 500; letter-spacing: 0.04em;
}
.global-loading__dots { display: flex; gap: 6px; margin-top: 10px; }
.global-loading__dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--c-primary);
  animation: loading-dot 1.2s ease-in-out infinite;
}
@keyframes loading-dot {
  0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}
.loading-fade-enter-active { transition: opacity 0.4s ease; }
.loading-fade-leave-active { transition: opacity 0.25s ease; }
.loading-fade-enter-from, .loading-fade-leave-to { opacity: 0; }
</style>