<template>
  <!--
    DailyWord — 每日治愈文案组件
    功能：随机展示西高地治愈短句，定时刷新
    复用场景：首页治愈文案区
  -->
  <div class="daily-word" v-if="currentWord">
    <div class="daily-word__card reveal-item" data-delay="0.1">
      <span class="daily-word__label">每日治愈</span>
      <p class="daily-word__text">{{ currentWord.text }}</p>
      <span class="daily-word__author" v-if="currentWord.author">&mdash; {{ currentWord.author }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  words: { type: Array, default: () => [] },
  interval: { type: Number, default: 8 }
})

const currentIndex = ref(0)
let timer = null

const currentWord = computed(() => props.words[currentIndex.value] || null)

function shuffle() {
  if (props.words.length <= 1) return
  let next
  do {
    next = Math.floor(Math.random() * props.words.length)
  } while (next === currentIndex.value && props.words.length > 1)
  currentIndex.value = next
}

onMounted(() => {
  shuffle()
  timer = setInterval(shuffle, props.interval * 1000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.daily-word {
  max-width: 640px; margin: 0 auto;
}
.daily-word__card {
  background: rgba(254,255,175,0.08);
  border: 1px solid rgba(254,255,175,0.15);
  border-radius: var(--c-radius-xl);
  padding: 36px; text-align: center;
  transition: transform 0.3s ease;
}
.daily-word__card:hover { transform: translateY(-2px); }
.daily-word__label {
  display: inline-block; font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--c-primary); margin-bottom: 16px;
  padding: 4px 12px; border: 1px solid var(--c-border);
  border-radius: 50px;
}
.daily-word__text {
  font-family: var(--c-font-serif); font-size: 1.25rem;
  font-weight: 500; color: var(--c-text);
  line-height: 1.8; font-style: italic;
}
.daily-word__author {
  display: block; margin-top: 14px;
  font-size: 0.85rem; color: var(--c-text-muted);
}
</style>