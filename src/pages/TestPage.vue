<template>
  <div class="page">
    <section class="section section--alt">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">Test</span>
          <h2 class="section__title">养前适配测试</h2>
          <p class="section__desc">5道选择题，测测你与西高地的适配度</p>
        </header>
        <TestModule :questions="testQuestions" @complete="onTestComplete" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { testQuestions } from '../data/index.js'
import TestModule from '../components/TestModule.vue'

function onTestComplete(result) {
  console.log('[Test] 完成:', result)
}

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