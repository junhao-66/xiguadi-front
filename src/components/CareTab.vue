<template>
  <!--
    CareTab — 养护分类切换组件
    功能：分洗护、饮食、泪痕、运动 tab 切换养护知识
    复用场景：养护百科页面
  -->
  <div class="care-tab reveal-item" data-delay="0.1">
    <div class="care-tab__nav">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['care-tab__btn', { 'care-tab__btn--active': activeKey === tab.key }]"
        @click="switchTab(tab.key)"
        :disabled="switching"
      >
        <span class="care-tab__btn-icon">
          <svg v-if="tab.icon === 'shower'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 3v3M9 3v3M4 11h16M6 11v8a2 2 0 002 2h8a2 2 0 002-2v-8"/>
          </svg>
          <svg v-else-if="tab.icon === 'food'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8h2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2h2"/><circle cx="9" cy="12" r="1"/>
          </svg>
          <svg v-else-if="tab.icon === 'eye'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
          <svg v-else-if="tab.icon === 'run'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="13" cy="4" r="2"/><path d="M6 22l3-8 3 2 3-4"/><path d="M7 12h1"/>
          </svg>
          <span v-else>{{ tab.icon }}</span>
        </span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <Transition name="care-fade" mode="out-in">
      <div v-if="activeContent" :key="activeKey" class="care-tab__content">
        <h3 class="care-tab__title">{{ activeContent.title }}</h3>
        <ul class="care-tab__list">
          <li
            v-for="(item, i) in activeContent.items"
            :key="i"
            class="care-tab__item"
          >
            <span class="care-tab__item-dot"></span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [
      { key: 'wash', label: '洗护指南', icon: 'shower' },
      { key: 'diet', label: '饮食建议', icon: 'food' },
      { key: 'tears', label: '泪痕护理', icon: 'eye' },
      { key: 'exercise', label: '运动计划', icon: 'run' }
    ]
  },
  contents: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['change'])

const activeKey = ref(props.tabs.length > 0 ? props.tabs[0].key : '')
const switching = ref(false)

const activeContent = computed(() => props.contents[activeKey.value] || null)

function switchTab(key) {
  if (switching.value || key === activeKey.value) return
  switching.value = true
  activeKey.value = key
  emit('change', key)
  setTimeout(() => (switching.value = false), 350)
}
</script>

<style scoped>
.care-tab { max-width: 720px; margin: 0 auto; }
.care-tab__nav {
  display: flex; gap: 8px; justify-content: center; margin-bottom: 32px;
  flex-wrap: wrap;
}
.care-tab__btn {
  display: flex; align-items: center; gap: 6px;
  padding: 11px 22px; font-size: 0.9rem; font-weight: 500;
  background: var(--color-bg-card); color: var(--color-text-secondary);
  border: 1.5px solid var(--color-border); border-radius: 50px;
  cursor: pointer; transition: all 0.35s ease;
}
.care-tab__btn:hover:not(:disabled) {
  border-color: var(--color-accent); color: var(--color-accent);
}
.care-tab__btn--active {
  background: var(--color-accent); color: #fff; border-color: var(--color-accent);
  box-shadow: 0 4px 14px rgba(1,69,242,0.3);
}
.care-tab__btn--active:hover { color: #fff; }
.care-tab__btn-icon { display: flex; align-items: center; }
.care-tab__title {
  font-family: var(--font-serif); font-size: 1.5rem;
  font-weight: 600; margin-bottom: 22px; text-align: center;
  color: var(--color-text-primary);
}
.care-tab__list {
  list-style: none; display: flex; flex-direction: column; gap: 10px;
}
.care-tab__item {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 20px; background: var(--color-bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border); font-size: 0.93rem;
  color: var(--color-text-secondary);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.care-tab__item:hover {
  transform: translateX(4px); box-shadow: var(--shadow-md);
}
.care-tab__item-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--color-accent); flex-shrink: 0; opacity: 0.7;
}
.care-fade-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.care-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.care-fade-enter-from { opacity: 0; transform: translateY(10px); }
.care-fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>