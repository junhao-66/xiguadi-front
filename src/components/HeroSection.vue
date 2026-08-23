<template>
  <section id="hero" class="hero" ref="sectionRef">
    <div class="hero__bg" ref="parallaxBg"></div>
    <div class="hero__inner">
      <div class="hero__text">
        <h1 class="hero__title reveal-item" data-delay="0.1">
          软绒西高<span class="hero__dot">.</span><br />玲珑白犬
        </h1>
        <p class="hero__subtitle reveal-item" data-delay="0.3">
          来自苏格兰高地的白色精灵，用最纯粹的笑容点亮每一个平凡的日子。
          乐观、勇敢、忠诚 — 西高地白梗，你最好的朋友。
        </p>
        <div class="hero__actions reveal-item" data-delay="0.5">
          <a href="#about" class="hero__btn hero__btn--primary">了解更多</a>
          <a href="#test" class="hero__btn hero__btn--ghost">养前测试</a>
        </div>
      </div>
      <div class="hero__image">
        <img
          src="/images/首页大头.png"
          alt="西高地白梗"
          class="hero__main-img"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const sectionRef = ref(null)
const parallaxBg = ref(null)

function onScroll() {
  if (parallaxBg.value) {
    parallaxBg.value.style.transform = `translateY(${window.scrollY * 0.15}px)`
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(170deg, #0145F2 0%, #0039CC 50%, #002D99 100%);
}
.hero__bg {
  position: absolute;
  inset: -60px 0 0 0;
  background:
    radial-gradient(ellipse 45% 45% at 25% 35%, rgba(255,255,255,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 55% 50% at 75% 60%, rgba(254,255,175,0.06) 0%, transparent 60%);
  will-change: transform;
}
.hero__inner {
  position: relative; z-index: 2;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center; gap: 40px;
  padding: 100px 36px 80px;
  max-width: 1240px; margin: 0 auto;
}
.hero__title {
  font-family: var(--c-font-serif);
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 700; line-height: 1.12; color: #fff;
  max-width: 500px; letter-spacing: -0.02em;
}
.hero__dot { color: var(--c-accent-warm); }
.hero__subtitle {
  margin-top: 24px;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: var(--c-text-light-secondary);
  max-width: 440px; line-height: 1.8;
}
.hero__actions { margin-top: 40px; display: flex; gap: 14px; flex-wrap: wrap; }
.hero__btn {
  display: inline-flex; align-items: center;
  padding: 13px 30px; font-size: 0.9rem; font-weight: 600;
  letter-spacing: 0.04em; text-decoration: none;
  border-radius: 50px; transition: all 0.35s ease;
}
.hero__btn--primary {
  background: #fff; color: var(--c-primary);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}
.hero__btn--primary:hover {
  background: var(--c-accent-warm); color: var(--c-primary);
  transform: translateY(-2px); box-shadow: 0 6px 28px rgba(0,0,0,0.2);
}
.hero__btn--ghost {
  background: transparent; color: #fff;
  border: 1.5px solid var(--c-border-light);
}
.hero__btn--ghost:hover {
  border-color: #fff; background: rgba(255,255,255,0.08);
}
.hero__image {
  position: relative; display: flex; align-items: center;
  justify-content: center; overflow: visible;
}
.hero__main-img {
  width: 130%; max-width: none; height: auto;
  margin-right: -30%;
  filter: drop-shadow(0 8px 30px rgba(0,0,0,0.15));
  object-fit: contain;
}

@media (max-width: 768px) {
  .hero__inner {
    grid-template-columns: 1fr; gap: 20px;
    padding: 100px 20px 60px; text-align: center;
  }
  .hero__title, .hero__subtitle { max-width: 100%; }
  .hero__actions { justify-content: center; }
  .hero__image { order: -1; }
  .hero__main-img { width: 90%; margin-right: 0; max-height: 50vh; }
}
</style>