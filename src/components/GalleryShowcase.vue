<template>
  <section id="gallery" class="gallery section--alt">
    <div class="container">
      <header class="section__header reveal-item">
        <span class="section__label">Gallery</span>
        <h2 class="section__title">西高地图鉴</h2>
      </header>

      <div class="gallery-grid">
        <div
          v-for="(item, idx) in galleryItems"
          :key="idx"
          class="gallery-grid__item"
          :class="`gallery-grid__item--${item.size}`"
        >
          <img
            :src="item.img"
            :alt="item.alt"
            class="gallery-grid__img reveal-item reveal-item--img"
            :data-delay="(idx * 0.12).toFixed(2)"
            loading="lazy"
            @load="onImgLoad($event)"
          />
        </div>

        <div v-if="!galleryItems.length" class="gallery-grid__empty">
          暂无图片，请添加西高地图片
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const galleryItems = [
  { img: 'images/配图1.png', alt: '西高地配图1', size: '1' },
  { img: 'images/配图2.png', alt: '西高地配图2', size: '2' },
  { img: 'images/配图3.png', alt: '西高地配图3', size: '3' },
  { img: 'images/配图5.png', alt: '西高地配图5', size: '3' },
  { img: 'images/配图4.png', alt: '西高地配图4', size: '2' },
  { img: 'images/配图6.png', alt: '西高地配图6', size: '1' }
]

function onImgLoad(e) {
  e.target.style.opacity = '1'
}
</script>

<style scoped>
.gallery {
  background: var(--c-bg-section-alt);
  padding: 100px 0;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  grid-auto-flow: dense;
}
.gallery-grid__item {
  position: relative;
  overflow: visible;
  display: flex; align-items: center; justify-content: center;
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
}
.gallery-grid__item--1 { grid-column: span 5; }
.gallery-grid__item--2 { grid-column: span 7; }
.gallery-grid__item--3 { grid-column: span 4; }
.gallery-grid__img {
  width: 100%; height: auto;
  object-fit: contain;
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
  transition: opacity 0.5s ease, transform 0.7s ease;
  opacity: 0;
}
.gallery-grid__img[src] { opacity: 1; }
.gallery-grid__item:hover .gallery-grid__img {
  transform: scale(1.05);
}
.gallery-grid__empty {
  grid-column: 1 / -1; text-align: center; padding: 40px 20px;
  font-size: 0.92rem; color: var(--c-text-muted);
}

@media (max-width: 768px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .gallery-grid__item--1,
  .gallery-grid__item--2,
  .gallery-grid__item--3 { grid-column: span 1; }
}
@media (max-width: 480px) {
  .gallery-grid { grid-template-columns: 1fr; }
}
</style>