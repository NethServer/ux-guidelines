/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

// guidelines.md, compiled by scripts/vite-plugin-guidelines.mjs
declare module '*.md' {
  import type { DefineComponent } from 'vue'
  export const toc: { id: string; title: string }[]
  const component: DefineComponent<object, object, unknown>
  export default component
}
