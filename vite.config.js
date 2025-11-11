import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Needed for GitHub Pages under https://anhaj0.github.io/ceac/
  base: '/ceac/',
})
