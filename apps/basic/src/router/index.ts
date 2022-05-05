import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// app router
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
    },
  ],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// config router
export const setupRouter = (app: App<Element>) => app.use(router)
