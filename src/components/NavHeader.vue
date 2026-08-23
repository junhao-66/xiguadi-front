<template>
  <!--
    NavHeader — 顶部导航组件
    功能：路由跳转 / 暗黑模式切换 / 移动端汉堡菜单
    复用场景：全局顶部导航
  -->
  <nav class="nav-header" :class="{ 'nav-header--scrolled': scrolled, 'nav-header--open': mobileOpen }">
    <div class="nav-header__inner container">
      <router-link to="/" class="nav-header__logo" aria-label="返回首页">XIGUA</router-link>

      <ul class="nav-header__links" role="navigation">
        <li v-for="link in navLinks" :key="link.to">
          <router-link :to="link.to" class="nav-header__link">{{ link.label }}</router-link>
        </li>
      </ul>

      <div class="nav-header__actions">
        <button class="nav-header__theme-btn" @click="toggleDark" :aria-label="isDark ? '切换亮色模式' : '切换暗色模式'">
          <svg v-if="!isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>

        <button class="nav-header__toggle" :class="{ 'nav-header__toggle--active': mobileOpen }" @click="mobileOpen = !mobileOpen" aria-label="切换菜单">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <Transition name="slide-down">
      <ul v-if="mobileOpen" class="nav-header__mobile" role="navigation">
        <li v-for="link in navLinks" :key="link.to">
          <router-link :to="link.to" class="nav-header__link" @click="mobileOpen = false">{{ link.label }}</router-link>
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const navLinks = [
  { label: '首页', to: '/' },
  { label: '关于西高地', to: '/about' },
  { label: '养护成长', to: '/care' },
  { label: '养前测试', to: '/test' },
  { label: '留言分享', to: '/comments' }
]

const scrolled = ref(false)
const mobileOpen = ref(false)
const isDark = ref(false)

function onScroll() { scrolled.value = window.scrollY > 60 }

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('xigua-dark-mode', isDark.value ? '1' : '0')
}

onMounted(() => {
  const saved = localStorage.getItem('xigua-dark-mode')
  if (saved === '1') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 16px 0;
  transition: background 0.45s var(--ease-out-quart), box-shadow 0.45s var(--ease-out-quart), padding 0.45s var(--ease-out-quart);
}
.nav-header--scrolled {
  background: var(--color-bg-card);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--color-border);
  padding: 10px 0;
}
.nav-header__inner {
  display: flex; align-items: center; justify-content: space-between;
}
.nav-header__logo {
  font-family: var(--font-serif); font-size: 1.5rem; font-weight: 700;
  color: var(--color-text-primary); text-decoration: none; letter-spacing: 0.08em;
  transition: color 0.3s;
}
.nav-header__logo:hover { color: var(--color-accent); }
.nav-header__links {
  display: flex; list-style: none; gap: 36px;
}
.nav-header__link {
  font-size: 0.9rem; font-weight: 500; color: var(--color-text-secondary);
  text-decoration: none; letter-spacing: 0.03em; padding: 4px 0;
  transition: color 0.3s;
}
.nav-header__link:hover { color: var(--color-text-primary); }
.nav-header__link.router-link-exact-active { color: var(--color-accent); }

.nav-header__actions {
  display: flex; align-items: center; gap: 12px;
}
.nav-header__theme-btn {
  background: none; border: 1px solid var(--color-border); border-radius: 50%;
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--color-text-secondary);
  transition: color 0.3s, border-color 0.3s, background 0.3s;
}
.nav-header__theme-btn:hover { color: var(--color-accent); border-color: var(--color-accent); }

.nav-header__toggle {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 4px;
}
.nav-header__toggle span {
  display: block; width: 24px; height: 2px;
  background: var(--color-text-primary); border-radius: 2px;
  transition: transform 0.35s var(--ease-out-quart), opacity 0.35s;
}
.nav-header__toggle--active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-header__toggle--active span:nth-child(2) { opacity: 0; }
.nav-header__toggle--active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.nav-header__mobile {
  display: flex; flex-direction: column; list-style: none; gap: 8px;
  padding: 16px 40px 24px;
  background: var(--color-bg-card);
  backdrop-filter: blur(20px) saturate(160%);
  border-bottom: 1px solid var(--color-border);
}
.nav-header__mobile .nav-header__link { font-size: 1rem; display: block; padding: 8px 0; }

.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease-out; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-10px); }

@media (max-width: 768px) {
  .nav-header__links { display: none; }
  .nav-header__toggle { display: flex; }
}
</style>