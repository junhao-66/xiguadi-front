<template>
  <nav class="app-header" :class="{ 'app-header--scrolled': scrolled, 'app-header--open': mobileOpen }">
    <div class="app-header__inner container">
      <router-link to="/" class="app-header__logo">西高地白梗</router-link>

      <ul class="app-header__links" role="navigation">
        <li v-for="link in navLinks" :key="link.path">
          <router-link :to="link.path" class="app-header__link" active-class="app-header__link--active">{{ link.label }}</router-link>
        </li>
      </ul>

      <div class="app-header__actions">
        <button
          class="app-header__dark-btn"
          @click="toggleDark"
          :aria-label="isDark ? '切换亮色模式' : '切换暗色模式'"
        >
          <svg v-if="!isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>

        <button
          class="app-header__hamburger"
          :class="{ 'app-header__hamburger--open': mobileOpen }"
          @click="mobileOpen = !mobileOpen"
          aria-label="切换菜单"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <Transition name="slide">
      <ul v-if="mobileOpen" class="app-header__mobile" role="navigation">
        <li v-for="link in navLinks" :key="link.path">
          <router-link :to="link.path" class="app-header__link" @click="mobileOpen = false" active-class="app-header__link--active">{{ link.label }}</router-link>
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navLinks = [
  { label: '首页', path: '/' },
  { label: '关于西高地', path: '/about' },
  { label: '养护百科', path: '/care' },
  { label: '成长日记', path: '/growth' },
  { label: '养前测试', path: '/test' },
  { label: '留言分享', path: '/comments' }
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
.app-header {
  position: fixed;
  top: 0; left: 0; right: 0; z-index: 1000;
  padding: 16px 0;
  transition: background 0.45s ease, box-shadow 0.45s ease, padding 0.45s ease;
}
.app-header--scrolled {
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  box-shadow: var(--c-shadow-sm);
  border-bottom: 1px solid var(--c-border);
  padding: 10px 0;
}
.app-header__inner {
  display: flex; align-items: center; justify-content: space-between;
}
.app-header__logo {
  font-family: var(--c-font-serif);
  font-size: 1.4rem; font-weight: 700; color: #fff;
  text-decoration: none; letter-spacing: 0.06em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.15);
}
.app-header--scrolled .app-header__logo {
  color: var(--c-primary);
  text-shadow: none;
}
.app-header__links {
  display: flex; list-style: none; gap: 32px;
}
.app-header__link {
  font-size: 0.9rem; font-weight: 500;
  color: var(--c-text-light-secondary);
  text-decoration: none; padding: 4px 0; position: relative;
  transition: color 0.3s;
}
.app-header--scrolled .app-header__link { color: var(--c-text-secondary); }
.app-header__link:hover { color: #fff; }
.app-header__link--active { color: #fff; font-weight: 600; }
.app-header--scrolled .app-header__link:hover { color: var(--c-primary); }
.app-header--scrolled .app-header__link--active { color: var(--c-primary); font-weight: 600; }

.app-header__actions { display: flex; align-items: center; gap: 12px; }
.app-header__dark-btn {
  background: none; border: none; cursor: pointer;
  color: #fff; padding: 4px; display: flex; align-items: center;
  transition: color 0.3s; opacity: 0.8;
}
.app-header__dark-btn:hover { opacity: 1; }
.app-header--scrolled .app-header__dark-btn { color: var(--c-text); }

.app-header__hamburger {
  display: none; flex-direction: column; gap: 5px; background: none;
  border: none; cursor: pointer; padding: 4px;
}
.app-header__hamburger span {
  display: block; width: 22px; height: 2px; background: #fff;
  border-radius: 2px; transition: transform 0.35s, opacity 0.35s;
}
.app-header--scrolled .app-header__hamburger span { background: var(--c-text); }
.app-header__hamburger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.app-header__hamburger--open span:nth-child(2) { opacity: 0; }
.app-header__hamburger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.app-header__mobile {
  display: flex; flex-direction: column; list-style: none; gap: 6px;
  padding: 12px 36px 20px; background: rgba(255,255,255,0.95);
  backdrop-filter: blur(16px); border-bottom: 1px solid var(--c-border);
}
.app-header__mobile .app-header__link {
  font-size: 1rem; display: block; padding: 6px 0; color: var(--c-text-secondary);
}

.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 768px) {
  .app-header__links { display: none; }
  .app-header__hamburger { display: flex; }
  .app-header__actions { gap: 8px; }
  .app-header__mobile { padding: 12px 20px 20px; }
}

/* === 暗色模式适配 === */
:global(.dark) .app-header--scrolled {
  background: rgba(10, 14, 26, 0.92);
  border-bottom-color: rgba(255,255,255,0.08);
}
:global(.dark) .app-header__logo {
  color: #fff;
}
:global(.dark) .app-header__link { color: rgba(255,255,255,0.7); }
:global(.dark) .app-header__link:hover { color: #fff; }
:global(.dark) .app-header__link--active { color: #fff; }
:global(.dark) .app-header__dark-btn { color: rgba(255,255,255,0.7); }
:global(.dark) .app-header__hamburger span { background: #fff; }
</style>