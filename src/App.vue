<template>
  <div class="app" ref="appRef">
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <SiteFooter />
    <BackTop :threshold="400" />
    <GlobalLoading :visible="isLoading" text="正在加载中..." />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import BackTop from './components/BackTop.vue'
import GlobalLoading from './components/GlobalLoading.vue'

const router = useRouter()
const isLoading = ref(false)

/* ===== 路由变化时滚动到顶部 ===== */
watch(() => router.currentRoute.value.path, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style>
/* ===== 页面切换动画 ===== */
.page-fade-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.page-fade-leave-active {
  transition: opacity 0.3s ease;
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-fade-leave-to {
  opacity: 0;
}
</style>