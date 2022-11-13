import type { RouteRecordRaw } from 'vue-router'
import { BlankLayout } from '@gmok/layouts'
import { NotFound } from '@gmok/components'

export const commonRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'CommonPage',
    component: BlankLayout,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/sys/login/index.vue'),
      },
    ],
  },
  {
    path: '/:path(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]
