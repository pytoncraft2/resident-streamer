import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "static",
  resolve:{
    alias:{
      // ESM : pas de require/__dirname dans la config depuis Vite 5+.
      '@' : fileURLToPath(new URL('./static', import.meta.url))
    },
  },
  server: {
    host: true
  }
})
