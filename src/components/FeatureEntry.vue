<template>
  <!--
    FeatureEntry — 功能入口卡片组件
    功能：图鉴/养护/成长日记/性格测试四大板块跳转卡片
    复用场景：首页导航板块
  -->
  <div class="feature-entry-grid">
    <router-link
      v-for="(item, idx) in items"
      :key="idx"
      :to="item.to"
      class="feature-entry-card reveal-item"
      :data-delay="(idx * 0.12).toFixed(2)"
    >
      <div class="feature-entry-card__icon">
        <svg v-if="item.icon === 'gallery'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
        </svg>
        <svg v-else-if="item.icon === 'care'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
        <svg v-else-if="item.icon === 'diary'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
        <svg v-else-if="item.icon === 'test'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      </div>
      <h3 class="feature-entry-card__title">{{ item.title }}</h3>
      <p class="feature-entry-card__desc">{{ item.desc }}</p>
      <span class="feature-entry-card__arrow">&rarr;</span>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>

<style scoped>
.feature-entry-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
}
.feature-entry-card {
  display: flex; flex-direction: column; align-items: center;
  padding: 30px 20px; text-align: center;
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: var(--c-radius-lg);
  text-decoration: none; color: inherit;
  transition: transform 0.35s var(--c-ease), box-shadow 0.35s var(--c-ease);
  position: relative; overflow: hidden;
}
.feature-entry-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--c-shadow-lg);
}
.feature-entry-card__icon {
  width: 64px; height: 64px; border-radius: var(--c-radius-md);
  background: var(--c-bg-section-alt);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px; color: var(--c-primary);
  transition: background 0.3s, transform 0.3s;
}
.feature-entry-card:hover .feature-entry-card__icon {
  background: var(--c-primary); color: #fff;
  transform: scale(1.05);
}
.feature-entry-card__title {
  font-family: var(--c-font-serif); font-size: 1.1rem;
  font-weight: 600; margin-bottom: 8px; color: var(--c-text);
}
.feature-entry-card__desc {
  font-size: 0.85rem; color: var(--c-text-muted); line-height: 1.5;
}
.feature-entry-card__arrow {
  margin-top: 12px; font-size: 1.1rem; color: var(--c-primary);
  opacity: 0; transform: translateX(-8px);
  transition: opacity 0.3s, transform 0.3s;
}
.feature-entry-card:hover .feature-entry-card__arrow {
  opacity: 1; transform: translateX(0);
}

@media (max-width: 768px) {
  .feature-entry-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
@media (max-width: 480px) {
  .feature-entry-grid { grid-template-columns: 1fr; }
}
</style>