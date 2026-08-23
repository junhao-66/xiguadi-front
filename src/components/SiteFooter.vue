<template>
  <footer id="contact" class="footer">
    <div class="container">
      <div class="footer__inner">
        <router-link to="/" class="footer__logo">西高地白梗</router-link>
        <p class="footer__tagline">
          纯白无瑕，快乐相伴 — 最全面的西高地白梗养护分享平台
        </p>

        <div class="footer__links">
          <router-link to="/">首页</router-link>
          <router-link to="/about">关于西高地</router-link>
          <router-link to="/care">养护百科</router-link>
          <router-link to="/growth">成长日记</router-link>
          <router-link to="/test">养前测试</router-link>
          <router-link to="/comments">留言分享</router-link>
        </div>

        <div class="footer__copy">
          &copy; 2026 西高地白梗品牌展示. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--c-primary-deep);
  color: rgba(255,255,255,0.7);
  padding: 60px 0 32px;
}
.footer__inner { text-align: center; }
.footer__logo {
  font-family: var(--c-font-serif);
  font-size: 1.3rem; font-weight: 700;
  color: #fff; text-decoration: none;
  letter-spacing: 0.06em;
}
.footer__tagline {
  margin-top: 10px; font-size: 0.85rem;
  color: rgba(255,255,255,0.45);
}
.footer__links {
  display: flex; justify-content: center; gap: 28px;
  margin-top: 24px; flex-wrap: wrap;
}
.footer__links a {
  font-size: 0.85rem; color: rgba(255,255,255,0.55);
  text-decoration: none; transition: color 0.3s;
}
.footer__links a:hover { color: var(--c-accent-warm); }
.footer__copy {
  margin-top: 32px; padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.08);
  font-size: 0.78rem; color: rgba(255,255,255,0.35);
}
</style>