import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  root: 'src/',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    host: true
  },
  plugins: [
    glsl()
  ],
  assetsInclude: ['**/*.gltf']
})
