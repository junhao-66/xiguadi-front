<template>
  <!--
    CommentCard — 留言展示卡片组件
    功能：循环渲染用户晒狗留言、配图内容
    复用场景：留言分享列表
  -->
  <div class="comment-card reveal-item" data-delay="0.1">
    <div class="comment-card__header">
      <div class="comment-card__avatar">{{ comment.avatar || '🐶' }}</div>
      <div class="comment-card__meta">
        <span class="comment-card__user">{{ comment.user || '匿名西友' }}</span>
        <span class="comment-card__time">{{ comment.time }}</span>
      </div>
    </div>

    <p class="comment-card__text" v-if="comment.text">{{ comment.text }}</p>

    <div class="comment-card__images" v-if="comment.images && comment.images.length">
      <div
        v-for="(img, idx) in comment.images"
        :key="idx"
        class="comment-card__img-wrap"
        :class="{ 'comment-card__img-wrap--single': comment.images.length === 1 }"
      >
        <img :src="img.src || img" :alt="img.name || '图片'" class="comment-card__img" />
      </div>
    </div>

    <div class="comment-card__footer">
      <button
        class="comment-card__like"
        :class="{ 'comment-card__like--active': comment.liked }"
        @click="$emit('like', comment.id)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" :fill="comment.liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
        <span>{{ comment.likes || 0 }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comment: { type: Object, required: true }
})
defineEmits(['like'])
</script>

<style scoped>
.comment-card {
  background: var(--color-bg-card); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: 20px 24px;
  margin-bottom: 16px; transition: box-shadow 0.3s;
}
.comment-card:hover { box-shadow: var(--shadow-sm); }
.comment-card__header {
  display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
}
.comment-card__avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--color-bg-secondary); display: flex;
  align-items: center; justify-content: center; font-size: 1.2rem;
}
.comment-card__meta { display: flex; flex-direction: column; }
.comment-card__user {
  font-size: 0.9rem; font-weight: 600; color: var(--color-text-primary);
}
.comment-card__time {
  font-size: 0.75rem; color: var(--color-text-muted);
}
.comment-card__text {
  font-size: 0.93rem; color: var(--color-text-secondary); line-height: 1.7;
  margin-bottom: 12px;
}
.comment-card__images {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  margin-bottom: 12px;
}
.comment-card__img-wrap {
  border-radius: var(--radius-sm); overflow: hidden; aspect-ratio: 1;
}
.comment-card__img-wrap--single { grid-column: span 2; aspect-ratio: 16/10; }
.comment-card__img {
  width: 100%; height: 100%; object-fit: cover;
}
.comment-card__footer { display: flex; align-items: center; }
.comment-card__like {
  display: flex; align-items: center; gap: 6px;
  background: none; border: 1px solid var(--color-border);
  border-radius: 50px; padding: 6px 14px;
  font-size: 0.82rem; color: var(--color-text-muted);
  cursor: pointer; transition: all 0.3s;
}
.comment-card__like:hover { border-color: var(--color-accent); color: var(--color-accent); }
.comment-card__like--active { color: #e74c3c; border-color: #e74c3c; }
</style>