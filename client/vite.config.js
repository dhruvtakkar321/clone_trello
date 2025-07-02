import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../client/build',   
    emptyOutDir: true,           
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Optional: for clean imports
    },
  },
})
