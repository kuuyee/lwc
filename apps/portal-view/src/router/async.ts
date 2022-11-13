import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@gmok/layouts'

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'BasicPage',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/home/index.vue'),
      },
    ],
  },
]
