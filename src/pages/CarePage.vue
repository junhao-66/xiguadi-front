<template>
  <div class="page">
    <section class="section section--alt">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">Care Guide</span>
          <h2 class="section__title">养护百科</h2>
        </header>
        <CareTab :tabs="careTabs" :contents="careContents" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { careTabs, careContents } from '../data/index.js'
import CareTab from '../components/CareTab.vue'

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target
        const delay = parseFloat(item.getAttribute('data-delay') || '0')
        const once = item.getAttribute('data-once')
        if (once !== null && item.dataset.revealed) return
        setTimeout(() => { item.classList.add('is-revealed'); item.dataset.revealed = '1' }, delay * 1000)
        if (once !== null) observer.unobserve(item)
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  setTimeout(() => {
    document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el))
  }, 100)
})
</script>