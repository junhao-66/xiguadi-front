/**
 * useScrollReveal — 基于 IntersectionObserver 的滚动显形动画
 *
 * 用法：
 *   <div ref="el" class="reveal-item" data-delay="0.15">
 *
 * HTML 属性：
 *   data-delay  — 延迟入场秒数 (如 0.2)
 *   data-once    — 设 "true" 时动画只执行一次
 *
 * CSS 需配合：
 *   .reveal-item { opacity: 0; transform: translateY(30px); transition: ...; }
 *   .reveal-item.is-revealed { opacity: 1; transform: translateY(0); }
 */

import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollReveal(options = {}) {
  const { rootMargin = '0px 0px -60px 0px', threshold = 0.15 } = options
  const targetRef = ref(null)
  let observer = null

  function handleIntersect(entries) {
    entries.forEach((entry) => {
      const el = entry.target
      const once = el.dataset.once === 'true'

      if (entry.isIntersecting) {
        const delay = parseFloat(el.dataset.delay) || 0
        setTimeout(() => {
          el.classList.add('is-revealed')
        }, delay * 1000)
      } else {
        if (!once) {
          el.classList.remove('is-revealed')
        }
      }
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersect, {
      rootMargin,
      threshold
    })
    if (targetRef.value) {
      targetRef.value.querySelectorAll('.reveal-item').forEach((el) => observer.observe(el))
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { targetRef }
}

/**
 * useBatchReveal — 批量观察页面上所有 .reveal-item
 * 适合在整个页面级别统一管理动画
 */
export function useBatchReveal(rootRef, options = {}) {
  const { rootMargin = '0px 0px -60px 0px', threshold = 0.15 } = options
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target
          const once = el.dataset.once === 'true'

          if (entry.isIntersecting) {
            const delay = parseFloat(el.dataset.delay) || 0
            setTimeout(() => {
              el.classList.add('is-revealed')
            }, delay * 1000)
          } else {
            if (!once) {
              el.classList.remove('is-revealed')
            }
          }
        })
      },
      { rootMargin, threshold }
    )

    const root = rootRef?.value || document
    const items = root.querySelectorAll ? root.querySelectorAll('.reveal-item') : document.querySelectorAll('.reveal-item')
    items.forEach((el) => observer.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}