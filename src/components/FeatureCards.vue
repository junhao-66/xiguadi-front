<template>
  <section id="features" class="features section">
    <div class="container">
      <header class="section__header reveal-item">
        <span class="section__label">Highlights</span>
        <h2 class="section__title">为什么选择西高地</h2>
      </header>

      <div class="feature-grid">
        <div
          v-for="(item, idx) in features"
          :key="idx"
          class="feature-card reveal-item"
          :data-delay="(idx * 0.1).toFixed(2)"
        >
          <div class="feature-card__icon">
            <svg v-if="item.icon === 'smile'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
            <svg v-else-if="item.icon === 'heart'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <svg v-else-if="item.icon === 'shield'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <svg v-else-if="item.icon === 'star'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span v-else>{{ item.icon }}</span>
          </div>
          <h3 class="feature-card__title">{{ item.title }}</h3>
          <p class="feature-card__desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: 'smile',
    title: '天性乐观',
    desc: '西高地白梗天性活泼开朗，永远充满好奇心，是家庭中的"开心果"，用它们纯真的笑容治愈每一个家庭成员。'
  },
  {
    icon: 'heart',
    title: '忠诚友善',
    desc: '对主人极度忠诚，与孩子和其他宠物都能友好相处。12-16年的寿命意味着它将是你人生中最长情的陪伴。'
  },
  {
    icon: 'shield',
    title: '体质强健',
    desc: '属于硬朗的小型犬品种，适应力强，不易生病。只要合理饮食和定期运动，就能保持健康活力。'
  },
  {
    icon: 'star',
    title: '颜值担当',
    desc: '纯白双层被毛，立耳黑鼻，圆溜溜的大眼睛 — 西高地拥有让人过目不忘的独特外貌，是犬界的"颜值天花板"。'
  }
]
</script>

<style scoped>
.features {
  background: var(--c-bg-section);
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
}
.feature-card {
  padding: 40px 34px;
  border-radius: var(--c-radius-lg);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  cursor: default;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
}
.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--c-shadow-xl);
  border-color: var(--c-border-hover);
}
.feature-card__icon {
  width: 56px; height: 56px;
  border-radius: var(--c-radius-md);
  background: linear-gradient(135deg, rgba(1,69,242,0.1), rgba(67,114,245,0.05));
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 22px; color: var(--c-primary);
}
.feature-card__icon svg {
  width: 28px; height: 28px;
}
.feature-card__title {
  font-family: var(--c-font-serif);
  font-size: 1.25rem; font-weight: 600;
  margin-bottom: 12px; color: var(--c-text);
}
.feature-card__desc {
  font-size: 0.95rem; color: var(--c-text-secondary); line-height: 1.75;
}
</style>