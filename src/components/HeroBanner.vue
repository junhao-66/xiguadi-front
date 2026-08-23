<template>
  <!--
    HeroBanner — 首页横幅轮播组件
    功能：西高地主题大图 / 渐入动画 / 网站 slogan
    复用场景：首页轮播展示区
  -->
  <div
    class="hero-banner"
    :style="{ height: height }"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <div class="hero-banner__slides">
      <Transition name="banner-fade">
        <div v-if="currentSlide" :key="currentIndex" class="hero-banner__slide">
          <div class="hero-banner__bg"></div>
          <div class="hero-banner__content">
            <h2 class="hero-banner__slogan reveal-item" data-delay="0.15" data-once="true">{{ currentSlide.slogan }}</h2>
            <p v-if="currentSlide.sub" class="hero-banner__sub reveal-item" data-delay="0.35" data-once="true">{{ currentSlide.sub }}</p>
          </div>
        </div>
      </Transition>
    </div>

    <img
      v-if="currentSlide"
      :src="currentSlide.img"
      :alt="currentSlide.slogan"
      class="hero-banner__img"
    />

    <button v-if="slides.length > 1" class="hero-banner__arrow hero-banner__arrow--left" @click="prev" aria-label="上一张">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
    <button v-if="slides.length > 1" class="hero-banner__arrow hero-banner__arrow--right" @click="next" aria-label="下一张">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>

    <div v-if="slides.length > 1" class="hero-banner__dots">
      <button
        v-for="(_, idx) in slides.length"
        :key="idx"
        :class="['hero-banner__dot', { 'hero-banner__dot--active': idx === currentIndex }]"
        @click="goTo(idx)"
        :aria-label="`切换到第${idx + 1}张`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  slides: { type: Array, required: true },
  interval: { type: Number, default: 5000 },
  height: { type: String, default: '500px' }
})

const currentIndex = ref(0)
const transitioning = ref(false)
let timer = null

const currentSlide = computed(() => props.slides[currentIndex.value] || null)

function goTo(index) {
  if (transitioning.value || index === currentIndex.value) return
  transitioning.value = true
  currentIndex.value = index
  setTimeout(() => (transitioning.value = false), 600)
}

function next() { goTo((currentIndex.value + 1) % props.slides.length) }
function prev() { goTo((currentIndex.value - 1 + props.slides.length) % props.slides.length) }

function startAutoPlay() {
  stopAutoPlay()
  if (props.slides.length > 1) timer = setInterval(next, props.interval)
}
function stopAutoPlay() { clearInterval(timer); timer = null }

onMounted(() => startAutoPlay())
onBeforeUnmount(() => stopAutoPlay())
</script>

<style scoped>
.hero-banner {
  position: relative; overflow: visible;
  margin: 40px auto; max-width: 1240px;
  border-radius: var(--c-radius-xl);
}
.hero-banner__slides {
  position: relative; width: 100%; height: 100%;
  overflow: hidden;
  border-radius: var(--c-radius-xl);
}
.hero-banner__slide {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.hero-banner__bg {
  position: absolute; inset: 0;
  background: linear-gradient(170deg, #0145F2 0%, #0039CC 40%, #002D99 100%);
}
.hero-banner__img {
  position: absolute;
  bottom: 0; left: 50%; transform: translateX(-50%);
  width: 80%; height: auto; max-height: 140%;
  object-fit: contain;
  z-index: 1;
  pointer-events: none;
}
.hero-banner__content {
  position: relative; z-index: 2; text-align: left;
  padding: 48px; max-width: 520px;
  margin-right: auto;
}
.hero-banner__slogan {
  font-family: var(--c-font-serif); font-size: clamp(1.6rem, 3vw, 2.6rem);
  font-weight: 700; color: #fff;
  letter-spacing: 0.03em; line-height: 1.3;
}
.hero-banner__sub {
  margin-top: 14px; font-size: 1rem; color: rgba(255,255,255,0.78);
  line-height: 1.7;
}
.hero-banner__arrow {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 3;
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(255,255,255,0.2); color: #fff;
  border: 1.5px solid rgba(255,255,255,0.3);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(6px);
  transition: background 0.3s, transform 0.3s;
}
.hero-banner__arrow:hover { background: rgba(255,255,255,0.35); transform: translateY(-50%) scale(1.08); }
.hero-banner__arrow--left { left: 16px; }
.hero-banner__arrow--right { right: 16px; }
.hero-banner__dots {
  position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 3;
  display: flex; gap: 10px;
}
.hero-banner__dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: rgba(255,255,255,0.4); border: none; cursor: pointer;
  transition: background 0.35s, transform 0.35s;
}
.hero-banner__dot--active { background: #fff; transform: scale(1.3); }

.banner-fade-enter-active { transition: opacity 0.55s ease; }
.banner-fade-leave-active { transition: opacity 0.35s ease; }
.banner-fade-enter-from { opacity: 0; transform: scale(1.04); }
.banner-fade-leave-to { opacity: 0; transform: scale(0.96); }

@media (max-width: 768px) {
  .hero-banner { border-radius: 0; margin: 0; }
  .hero-banner__slides { border-radius: 0; }
  .hero-banner__content { padding: 28px; max-width: 100%; }
  .hero-banner__img { right: -20%; width: 80%; max-height: 110%; }
  .hero-banner__arrow { width: 36px; height: 36px; }
  .hero-banner__arrow--left { left: 8px; }
  .hero-banner__arrow--right { right: 8px; }
}
</style>