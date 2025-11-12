import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This is CRITICAL for GitHub Pages
  base: '/ceac/',
})