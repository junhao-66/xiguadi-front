<template>
  <!--
    LanyardCard — 证件照吊牌组件
    功能：3D 物理模拟证件照吊牌，可拖拽交互
    复用场景：关于西高地模块下方
  -->
  <section class="lanyard-section section--alt">
    <div class="container">
      <header class="section__header reveal-item">
        <span class="section__label">ID Card</span>
        <h2 class="section__title">西高地证件照</h2>
        <p class="section__desc">拖拽吊牌，与西高地互动</p>
      </header>
      <div class="lanyard-wrapper">
        <VueLanyard
          :position="[0, 0, 18]"
          :gravity="[0, -40, 0]"
          :fov="24"
          :transparent="true"
          frontImage="/images/证件照.png"
          imageFit="cover"
          lanyardImage="/lanyard-assets/黑.png"
          :lanyardWidth="1.2"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import VueLanyard from './lanyard/VueLanyard.vue'
</script>

<style scoped>
.lanyard-section {
  padding: 60px 0 0;
}
.lanyard-wrapper {
  width: 100%;
  height: 620px;
  position: relative;
}
.lanyard-wrapper :deep(.vue-lanyard-container) {
  height: 100%;
}
@media (max-width: 768px) {
  .lanyard-wrapper {
    height: 480px;
  }
}
@media (max-width: 480px) {
  .lanyard-wrapper {
    height: 400px;
  }
}
</style>