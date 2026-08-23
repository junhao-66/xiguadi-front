<template>
  <div class="page">
    <!-- ===== 关于西高地 — 图文交错 ===== -->
    <section class="section section--alt">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">About</span>
          <h2 class="section__title">关于西高地白梗</h2>
        </header>

        <article
          v-for="(block, idx) in aboutBlocks"
          :key="idx"
          class="media-block"
          :class="{ 'media-block--reverse': block.reverse }"
        >
          <div class="media-block__img-wrap img-transparent-wrap">
            <img
              :src="block.img"
              :alt="block.alt"
              class="media-block__img reveal-item reveal-item--img"
            />
          </div>
          <div class="media-block__text reveal-item" data-delay="0.15">
            <span class="media-block__tag">{{ block.tag }}</span>
            <h3 class="media-block__title">{{ block.title }}</h3>
            <p class="media-block__desc">{{ block.desc }}</p>
          </div>
        </article>

        <div class="about-stats">
          <div class="about-stat reveal-item" v-for="(stat, i) in aboutStats" :key="i" :data-delay="(i * 0.1).toFixed(2)">
            <span class="about-stat__value">{{ stat.value }}</span>
            <span class="about-stat__label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 性格特质 ===== -->
    <section class="section">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">性格特质</span>
          <h2 class="section__title">为什么我们都爱西高地</h2>
        </header>
        <FeatureCards />
      </div>
    </section>

    <!-- ===== 每日治愈 ===== -->
    <section class="section section--alt">
      <div class="container">
        <DailyWord :words="dailyWords" :interval="8" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { aboutStats, aboutBlocks, dailyWords } from '../data/index.js'
import FeatureCards from '../components/FeatureCards.vue'
import DailyWord from '../components/DailyWord.vue'

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target
        const delay = parseFloat(item.getAttribute('data-delay') || '0')
        const once = item.getAttribute('data-once')
        if (once !== null && item.dataset.revealed) return
        setTimeout(() => { item.classList.add('is-revealed'); item.dataset.revealed = '1' }, delay * 1000)
        if (once !== null) observer.unobserve(item)
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  setTimeout(() => {
    document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el))
  }, 100)
})
</script>

<style scoped>
.media-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 64px;
  align-items: center;
  margin-bottom: 80px;
}
.media-block:last-of-type { margin-bottom: 0; }
.media-block--reverse .media-block__img-wrap { grid-column: 2 / 3; }
.media-block--reverse .media-block__text { grid-column: 1 / 2; }
.media-block__img-wrap {
  position: relative; overflow: visible;
  display: flex; align-items: center; justify-content: center;
  height: 420px;
  grid-row: 1 / 2;
}
.media-block__text {
  padding: 0 8px;
  grid-row: 1 / 2;
  display: flex; flex-direction: column; justify-content: center;
}
.media-block__img {
  width: 120%; height: auto; max-height: 110%;
  object-fit: contain;
  transition: opacity 0.6s ease, transform 0.8s var(--c-ease);
}
.media-block__img-wrap:hover .media-block__img { transform: scale(1.05); }
.media-block__tag {
  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--c-primary);
}
.media-block__title {
  font-family: var(--c-font-serif); font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700; margin-top: 14px; line-height: 1.3;
}
.media-block__desc {
  margin-top: 18px; font-size: 0.95rem; color: var(--c-text-secondary);
  line-height: 1.85; max-width: 440px;
}

.about-stats {
  display: flex; justify-content: center; gap: 20px;
  margin-top: 48px; flex-wrap: wrap;
}
.about-stat {
  padding: 20px 28px; border-radius: var(--c-radius-md);
  text-align: center; min-width: 120px; background: #fff;
  border: 1px solid rgba(0,0,0,0.04);
}
.about-stat__label {
  display: block; font-size: 0.78rem; font-weight: 500;
  color: var(--c-text-muted); text-transform: uppercase;
  letter-spacing: 0.06em;
}
.about-stat__value {
  display: block; font-family: var(--c-font-serif); font-size: 1.4rem;
  font-weight: 700; color: var(--c-primary); margin-top: 6px;
}

@media (max-width: 768px) {
  .media-block { grid-template-columns: 1fr; gap: 28px; margin-bottom: 56px; }
  .media-block__img-wrap { grid-column: 1 !important; height: 320px; }
  .media-block__img { width: 100%; }
  .media-block__text { grid-column: 1 !important; padding: 0; }
  .media-block__desc { max-width: 100%; }
  .media-block--reverse .media-block__img-wrap { grid-column: 1 !important; }
  .media-block--reverse .media-block__text { grid-column: 1 !important; }
  .about-stats { gap: 12px; }
  .about-stat { min-width: 100px; padding: 16px 20px; }
}
</style>