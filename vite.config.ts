import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'
import tailwindcss from "@tailwindcss/vite"

const root = path.resolve(__dirname, './src')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(),tailwindcss()],
  resolve: {
    alias: {
      '@/': `${root}/`,
    },
  },
})
