/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare interface Window {
  // extend the window
  __: unknown
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>
  export default component
}
