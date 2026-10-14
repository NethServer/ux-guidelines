import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import guidelines, { GUIDELINES_PATH } from './scripts/vite-plugin-guidelines.mjs'

export default defineConfig({
  // relative base: the site is served from https://<org>.github.io/ux-writing-guide/
  base: './',
  // guidelines.md becomes a Vue component, see scripts/vite-plugin-guidelines.mjs
  plugins: [guidelines(), vue({ include: [/\.vue$/, GUIDELINES_PATH] }), tailwindcss()]
})
