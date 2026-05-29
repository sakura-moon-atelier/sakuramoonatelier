import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'sakura-moon-atelier' with your actual GitHub repository name
// If deploying to username.github.io (user site), set base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/sakura-moon-atelier/',
})
