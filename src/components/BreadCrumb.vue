<template>
  <!--
    BreadCrumb — 面包屑导航组件
    功能：展示当前页面层级路径
    复用场景：所有子页面顶部
  -->
  <nav class="breadcrumb" aria-label="面包屑导航">
    <template v-for="(item, idx) in items" :key="idx">
      <span class="breadcrumb__sep" v-if="idx > 0">/</span>
      <router-link v-if="item.to" :to="item.to" class="breadcrumb__link">{{ item.label }}</router-link>
      <span v-else class="breadcrumb__current">{{ item.label }}</span>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.breadcrumb {
  display: flex; align-items: center; gap: 8px;
  padding: 20px 0; font-size: 0.88rem;
  color: var(--color-text-muted);
}
.breadcrumb__link {
  color: var(--color-text-secondary); text-decoration: none;
  transition: color 0.3s;
}
.breadcrumb__link:hover { color: var(--color-accent); }
.breadcrumb__current {
  color: var(--color-text-primary); font-weight: 500;
}
.breadcrumb__sep {
  color: var(--color-text-muted); user-select: none;
}
</style>