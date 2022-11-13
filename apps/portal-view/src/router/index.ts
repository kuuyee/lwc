import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { commonRoutes } from './common'
import { asyncRoutes } from './async'

// 路由表
const routes: RouteRecordRaw[] = [
  ...commonRoutes,
  // TODO: 动态加载
  ...asyncRoutes,
]

// app router
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
