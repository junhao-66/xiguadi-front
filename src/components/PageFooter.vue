<template>
  <!--
    PageFooter — 页脚组件
    功能：版权信息 / 养护快捷入口 / 回到顶部触发按钮
    复用场景：全局页脚
  -->
  <footer class="page-footer">
    <div class="container">
      <div class="page-footer__grid">
        <div class="page-footer__brand reveal-item">
          <router-link to="/" class="page-footer__logo">XIGUA</router-link>
          <p class="page-footer__tagline">西高地白梗 — 纯白无瑕，快乐相伴</p>
        </div>

        <div class="page-footer__col reveal-item" data-delay="0.1">
          <h4 class="page-footer__col-title">养护快捷入口</h4>
          <ul class="page-footer__links">
            <li><router-link to="/care">洗护指南</router-link></li>
            <li><router-link to="/care">饮食建议</router-link></li>
            <li><router-link to="/care">泪痕护理</router-link></li>
            <li><router-link to="/care">运动计划</router-link></li>
          </ul>
        </div>

        <div class="page-footer__col reveal-item" data-delay="0.15">
          <h4 class="page-footer__col-title">探索</h4>
          <ul class="page-footer__links">
            <li><router-link to="/about">西高地图鉴</router-link></li>
            <li><router-link to="/test">养前测试</router-link></li>
            <li><router-link to="/comments">留言分享</router-link></li>
          </ul>
        </div>

        <div class="page-footer__col reveal-item" data-delay="0.2">
          <h4 class="page-footer__col-title">更多</h4>
          <ul class="page-footer__links">
            <li><a href="#">关于我们</a></li>
            <li><a href="#">隐私政策</a></li>
          </ul>
        </div>
      </div>

      <div class="page-footer__bottom reveal-item" data-delay="0.25">
        <span>&copy; 2026 XIGUA 西高地白梗. All rights reserved.</span>
        <button class="page-footer__back-top" @click="scrollToTop" aria-label="回到顶部">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
          <span>回到顶部</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.page-footer {
  background: var(--color-text-primary);
  color: rgba(255, 255, 255, 0.75);
  padding: 80px 0 40px;
}
.page-footer__grid {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px;
}
.page-footer__logo {
  font-family: var(--font-serif); font-size: 1.5rem; font-weight: 700;
  color: #fff; text-decoration: none; letter-spacing: 0.08em;
}
.page-footer__tagline {
  margin-top: 16px; font-size: 0.9rem; line-height: 1.8; color: rgba(255,255,255,0.55);
}
.page-footer__col-title {
  font-size: 0.85rem; font-weight: 600; color: #fff; letter-spacing: 0.06em; margin-bottom: 20px;
}
.page-footer__links {
  list-style: none; display: flex; flex-direction: column; gap: 10px;
}
.page-footer__links a {
  font-size: 0.9rem; color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.3s;
}
.page-footer__links a:hover { color: var(--color-accent-light); }
.page-footer__bottom {
  margin-top: 64px; padding-top: 28px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.8rem; color: rgba(255,255,255,0.4);
}
.page-footer__back-top {
  display: flex; align-items: center; gap: 6px;
  background: none; border: 1px solid rgba(255,255,255,0.2); border-radius: 50px;
  padding: 8px 16px; color: rgba(255,255,255,0.6); cursor: pointer;
  font-size: 0.8rem; transition: color 0.3s, border-color 0.3s;
}
.page-footer__back-top:hover { color: #fff; border-color: rgba(255,255,255,0.5); }

@media (max-width: 768px) {
  .page-footer { padding: 60px 0 32px; }
  .page-footer__grid { grid-template-columns: 1fr 1fr; gap: 36px 24px; }
  .page-footer__brand { grid-column: 1 / -1; }
  .page-footer__bottom { flex-direction: column; gap: 16px; }
}
@media (max-width: 480px) {
  .page-footer__grid { grid-template-columns: 1fr; gap: 32px; }
  .page-footer__bottom { margin-top: 40px; }
}
</style>