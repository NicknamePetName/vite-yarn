import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({

  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    host: '0.0.0.0',  
    port: 8080,
    hmr: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 设置代理目标
        changeOrigin: true, // 是否改变请求源地址
        rewrite: (path) => path.replace(/^\/api/, '') // 将 /api 替换为空字符串
      }
    }
  },
  

  plugins: [vue()],
})

