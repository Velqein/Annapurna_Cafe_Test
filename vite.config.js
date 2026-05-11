import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/velqein.com/' → GitHub Pages project URL (velqein.github.io/velqein.com/)
// Change to '/' if you add a custom domain in Pages settings
export default defineConfig({
  plugins: [react()],
  base: '/velqein.com/',
})
