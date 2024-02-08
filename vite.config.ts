import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@styles:': path.resolve(__dirname, './src/styles'),
    },
  },
})
