import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import '@/assets/styles/variables.less'; @import '@/assets/styles/mixins.less';`,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.vue']
  }
})
