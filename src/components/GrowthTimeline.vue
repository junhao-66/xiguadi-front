<template>
  <!--
    GrowthTimeline — 幼犬成长时间轴组件
    功能：0-12个月西高地体型、喂养要点时间轴
    复用场景：养护成长页面
  -->
  <div class="growth-timeline">
    <div
      v-for="(stage, idx) in stages"
      :key="idx"
      class="growth-timeline__item"
      :class="{ 'growth-timeline__item--active': activeMonth === stage.month }"
      @click="toggleMonth(stage.month)"
    >
      <div class="growth-timeline__dot">
        <span class="growth-timeline__month">{{ stage.month }}月</span>
      </div>
      <div class="growth-timeline__content reveal-item" :data-delay="(idx * 0.08).toFixed(2)">
        <h4 class="growth-timeline__title">{{ stage.title }}</h4>
        <p class="growth-timeline__desc">{{ stage.desc }}</p>
        <Transition name="timeline-expand">
          <div v-if="activeMonth === stage.month" class="growth-timeline__stats">
            <span v-if="stage.weight" class="growth-timeline__stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><circle cx="12" cy="12" r="3"/></svg>
              体重: {{ stage.weight }}
            </span>
            <span v-if="stage.height" class="growth-timeline__stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v18M18 3v18M8 7h8M8 11h8M8 15h8"/></svg>
              肩高: {{ stage.height }}
            </span>
            <span v-if="stage.feeding" class="growth-timeline__stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2h2"/></svg>
              喂养: {{ stage.feeding }}
            </span>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  stages: { type: Array, required: true }
})

const activeMonth = ref(null)

function toggleMonth(month) {
  activeMonth.value = activeMonth.value === month ? null : month
}
</script>

<style scoped>
.growth-timeline {
  max-width: 640px; margin: 0 auto; position: relative; padding-left: 40px;
}
.growth-timeline::before {
  content: ''; position: absolute; left: 16px; top: 8px; bottom: 8px;
  width: 2px; background: var(--c-border);
}
.growth-timeline__item {
  position: relative; margin-bottom: 24px; cursor: pointer;
}
.growth-timeline__dot {
  position: absolute; left: -40px; top: 0;
  width: 34px; height: 34px; border-radius: 50%;
  background: #fff; border: 2px solid var(--c-border);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 600; color: var(--c-text-secondary);
  transition: border-color 0.3s, background 0.3s, color 0.3s;
  z-index: 2;
}
.growth-timeline__item--active .growth-timeline__dot,
.growth-timeline__item:hover .growth-timeline__dot {
  border-color: var(--c-primary); background: var(--c-primary);
  color: #fff;
}
.growth-timeline__content {
  padding: 20px 24px; background: #fff;
  border: 1px solid var(--c-border); border-radius: var(--c-radius-md);
  transition: box-shadow 0.3s;
}
.growth-timeline__item:hover .growth-timeline__content {
  box-shadow: var(--c-shadow-md);
}
.growth-timeline__title {
  font-family: var(--c-font-serif); font-size: 1.1rem;
  font-weight: 600; color: var(--c-text); margin-bottom: 4px;
}
.growth-timeline__desc {
  font-size: 0.88rem; color: var(--c-text-secondary); line-height: 1.6;
}
.growth-timeline__stats {
  margin-top: 14px; padding-top: 14px;
  border-top: 1px solid var(--c-border);
  display: flex; flex-wrap: wrap; gap: 14px;
}
.growth-timeline__stat {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.82rem; color: var(--c-text-muted);
}

.timeline-expand-enter-active { transition: all 0.35s ease; }
.timeline-expand-leave-active { transition: all 0.25s; }
.timeline-expand-enter-from { opacity: 0; max-height: 0; }
.timeline-expand-leave-to { opacity: 0; max-height: 0; }

@media (max-width: 480px) {
  .growth-timeline { padding-left: 32px; }
  .growth-timeline__dot { left: -32px; width: 28px; height: 28px; font-size: 0.65rem; }
  .growth-timeline__content { padding: 16px; }
}
</style>