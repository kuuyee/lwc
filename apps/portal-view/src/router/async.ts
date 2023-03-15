import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@gomk/layouts'

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'BasicPage',
    component: BasicLayout,
    children: [
      // {
      //   path: '/home',
      //   name: 'Home',
      //   component: () => import('@/pages/home/index.vue'),
      // },
      {
        path: '/home',
        name: 'RelaysList',
        component: () => import('@/pages/relays/index.vue'),
      },
    ],
  },
]
