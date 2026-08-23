import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base:'./',
  plugins: [vue(), react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  assetsInclude: ['**/*.glb'],
  // SPA 路由支持
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          elementPlus: ['element-plus']
        }
      }
    }
  }
})