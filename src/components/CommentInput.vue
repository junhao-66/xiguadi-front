<template>
  <!--
    CommentInput — 留言发布组件
    功能：输入文字、上传图片模拟提交留言
    复用场景：留言分享页面
  -->
  <div class="comment-input">
    <textarea
      v-model="text"
      class="comment-input__textarea"
      placeholder="分享你和西高地的故事..."
      maxlength="500"
      rows="3"
    ></textarea>

    <div v-if="imagePreviews.length" class="comment-input__previews">
      <div v-for="(img, idx) in imagePreviews" :key="idx" class="comment-input__preview-item">
        <img :src="img.src" :alt="img.name" class="comment-input__preview-img" />
        <button class="comment-input__preview-remove" @click="removeImage(idx)" aria-label="移除图片">&times;</button>
      </div>
    </div>

    <div class="comment-input__actions">
      <label class="comment-input__upload">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
        </svg>
        <span>上传图片</span>
        <input type="file" accept="image/*" multiple class="comment-input__file" @change="handleImageUpload" />
      </label>
      <span class="comment-input__count">{{ text.length }}/500</span>
      <button
        class="comment-input__submit"
        :class="{ 'comment-input__submit--loading': submitting }"
        :disabled="!text.trim() && !imagePreviews.length"
        @click="submit"
      >
        <span v-if="!submitting">发布留言</span>
        <span v-else>发布中...</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['submit'])

const text = ref('')
const imagePreviews = reactive([])
const submitting = ref(false)

function handleImageUpload(e) {
  const files = e.target.files
  if (!files) return
  for (let i = 0; i < files.length && imagePreviews.length < 4; i++) {
    const reader = new FileReader()
    reader.onload = (ev) => imagePreviews.push({ name: files[i].name, src: ev.target.result })
    reader.readAsDataURL(files[i])
  }
  e.target.value = ''
}

function removeImage(idx) { imagePreviews.splice(idx, 1) }

function submit() {
  if (!text.value.trim() && !imagePreviews.length) return
  submitting.value = true
  emit('submit', { text: text.value, images: [...imagePreviews] })
  setTimeout(() => {
    text.value = ''
    imagePreviews.splice(0)
    submitting.value = false
  }, 600)
}
</script>

<style scoped>
.comment-input {
  max-width: 640px; margin: 0 auto;
  padding: 24px; background: var(--color-bg-card);
  border: 1px solid var(--color-border); border-radius: var(--radius-lg);
}
.comment-input__textarea {
  width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-md);
  padding: 14px 16px; font-size: 0.93rem; font-family: var(--font-sans);
  color: var(--color-text-primary); background: var(--color-bg-primary);
  resize: vertical; outline: none; transition: border-color 0.3s;
}
.comment-input__textarea:focus { border-color: var(--color-accent); }
.comment-input__previews {
  display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap;
}
.comment-input__preview-item {
  position: relative; width: 80px; height: 80px; border-radius: var(--radius-sm); overflow: hidden;
}
.comment-input__preview-img {
  width: 100%; height: 100%; object-fit: cover;
}
.comment-input__preview-remove {
  position: absolute; top: 2px; right: 2px;
  width: 20px; height: 20px; border-radius: 50%;
  background: rgba(0,0,0,0.5); color: #fff; border: none;
  font-size: 0.85rem; cursor: pointer; display: flex;
  align-items: center; justify-content: center;
}
.comment-input__actions {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 14px; gap: 12px; flex-wrap: wrap;
}
.comment-input__upload {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.85rem; color: var(--color-text-secondary);
  cursor: pointer; transition: color 0.3s;
}
.comment-input__upload:hover { color: var(--color-accent); }
.comment-input__file { display: none; }
.comment-input__count {
  font-size: 0.8rem; color: var(--color-text-muted);
}
.comment-input__submit {
  padding: 8px 24px; border-radius: 50px;
  background: var(--color-accent); color: #fff; border: none;
  font-size: 0.88rem; font-weight: 500; cursor: pointer;
  transition: background 0.3s, opacity 0.3s;
}
.comment-input__submit:hover:not(:disabled) { background: var(--color-accent-deep); }
.comment-input__submit:disabled { opacity: 0.4; cursor: not-allowed; }
.comment-input__submit--loading { opacity: 0.7; }
</style>