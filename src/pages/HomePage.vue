<template>
  <div class="page">
    <HeroSection />

    <!-- ===== 快速入口 ===== -->
    <section class="section section--alt">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">快速入口</span>
          <h2 class="section__title">探索西高地世界</h2>
        </header>
        <FeatureEntry :items="featureEntries" />
      </div>
    </section>

    <!-- ===== 首页轮播 ===== -->
    <section class="section">
      <div class="container">
        <HeroBanner :slides="heroBannerSlides" :interval="4500" height="480px" />
      </div>
    </section>

    <!-- ===== 关于西高地 — 图文交错 ===== -->
    <section id="about" class="section section--alt">
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

    <!-- ===== 证件照吊牌 ===== -->
    <LanyardCard />

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

    <!-- ===== 西高地图鉴 ===== -->
    <section id="gallery" class="section">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">Gallery</span>
          <h2 class="section__title">西高地图鉴</h2>
        </header>
        <GalleryShowcase />
      </div>
    </section>

    <!-- ===== 养护百科 ===== -->
    <section id="care" class="section section--alt">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">Care Guide</span>
          <h2 class="section__title">养护百科</h2>
        </header>
        <CareTab :tabs="careTabs" :contents="careContents" />
      </div>
    </section>

    <!-- ===== 成长时间轴 ===== -->
    <section id="growth" class="section">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">Growth</span>
          <h2 class="section__title">0-12个月成长时间轴</h2>
        </header>
        <GrowthTimeline :stages="growthStages" />
      </div>
    </section>

    <!-- ===== 养前适配测试 ===== -->
    <section id="test" class="section section--alt">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">Test</span>
          <h2 class="section__title">养前适配测试</h2>
          <p class="section__desc">5道选择题，测测你与西高地的适配度</p>
        </header>
        <TestModule :questions="testQuestions" @complete="onTestComplete" />
      </div>
    </section>

    <!-- ===== 留言分享 ===== -->
    <section id="comments" class="section">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">Community</span>
          <h2 class="section__title">留言分享</h2>
        </header>
        <CommentInput @submit="onCommentSubmit" />
        <div style="max-width: 640px; margin: 32px auto 0;">
          <CommentCard
            v-for="comment in commentList"
            :key="comment.id"
            :comment="comment"
            @like="onLike"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  heroBannerSlides,
  featureEntries,
  aboutStats,
  aboutBlocks,
  dailyWords,
  careTabs,
  careContents,
  growthStages,
  testQuestions,
  initialComments
} from '../data/index.js'
import HeroSection from '../components/HeroSection.vue'
import HeroBanner from '../components/HeroBanner.vue'
import FeatureEntry from '../components/FeatureEntry.vue'
import FeatureCards from '../components/FeatureCards.vue'
import DailyWord from '../components/DailyWord.vue'
import LanyardCard from '../components/LanyardCard.vue'
import GalleryShowcase from '../components/GalleryShowcase.vue'
import CareTab from '../components/CareTab.vue'
import GrowthTimeline from '../components/GrowthTimeline.vue'
import TestModule from '../components/TestModule.vue'
import CommentInput from '../components/CommentInput.vue'
import CommentCard from '../components/CommentCard.vue'

const router = useRouter()

/* ===== 留言列表（响应式） ===== */
const commentList = reactive([...initialComments])

/* ===== 计算属性：留言统计 ===== */
const commentCount = computed(() => commentList.length)
const totalLikes = computed(() => commentList.reduce((sum, c) => sum + c.likes, 0))

/* ===== 侦听器：路由变化时重新触发滚动动画 ===== */
watch(() => router.currentRoute.value.path, () => {
  setTimeout(() => initRevealObserver(), 200)
})

/* ===== 事件处理 ===== */
function onTestComplete(result) {
  console.log('[Test] 完成:', result)
}

function onCommentSubmit(payload) {
  const newComment = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    user: '我', avatar: '🐶', text: payload.text,
    images: payload.images || [], time: '刚刚', likes: 0, liked: false
  }
  commentList.unshift(newComment)
}

function onLike(commentId) {
  const target = commentList.find(c => c.id === commentId)
  if (target) { target.liked = !target.liked; target.likes += target.liked ? 1 : -1 }
}

/* ===== IntersectionObserver 滚动动画 ===== */
function initRevealObserver() {
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

  document.querySelectorAll('.reveal-item:not(.is-revealed)').forEach(el => observer.observe(el))
}

onMounted(() => {
  setTimeout(() => initRevealObserver(), 100)
})
</script>

<style scoped>
/* ===== MediaBlock — 图文交错 ===== */
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

/* ===== About Stats ===== */
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