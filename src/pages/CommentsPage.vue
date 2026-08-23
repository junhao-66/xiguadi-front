<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <header class="section__header reveal-item">
          <span class="section__label">Community</span>
          <h2 class="section__title">留言分享</h2>
        </header>
        <CommentInput @submit="onCommentSubmit" />
        <div style="max-width: 640px; margin: 32px auto 0;">
          <CommentCard
            v-for="comment in commentList"
            :key="comment.id"
            :comment="comment"
            @like="onLike"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { initialComments } from '../data/index.js'
import CommentInput from '../components/CommentInput.vue'
import CommentCard from '../components/CommentCard.vue'

const commentList = reactive([...initialComments])

function onCommentSubmit(payload) {
  const newComment = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    user: '我', avatar: '🐶', text: payload.text,
    images: payload.images || [], time: '刚刚', likes: 0, liked: false
  }
  commentList.unshift(newComment)
}

function onLike(commentId) {
  const target = commentList.find(c => c.id === commentId)
  if (target) { target.liked = !target.liked; target.likes += target.liked ? 1 : -1 }
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