/**
 * useParallax — 轻微视差滚动效果
 *
 * 用法：
 *   const { el, parallaxStyle } = useParallax({ speed: 0.15 })
 *   <div :ref="el" :style="parallaxStyle">...</div>
 *
 * 原理：元素在视口中时，根据其相对视口位置偏移 translateY
 */

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export function useParallax({ speed = 0.12, maxOffset = 60 } = {}) {
  const el = ref(null)
  const scrollOffset = ref(0)

  function onScroll() {
    if (!el.value) return
    const rect = el.value.getBoundingClientRect()
    const windowH = window.innerHeight

    // 元素在视口中时计算偏移
    if (rect.top < windowH && rect.bottom > 0) {
      const center = rect.top + rect.height / 2
      const viewCenter = windowH / 2
      scrollOffset.value = (center - viewCenter) * speed
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })

  const parallaxStyle = computed(() => ({
    transform: `translateY(${scrollOffset.value}px)`,
    transition: 'transform 0.1s linear'
  }))

  return { el, parallaxStyle }
}