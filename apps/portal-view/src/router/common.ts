import type { RouteRecordRaw } from 'vue-router'
import { BlankLayout } from '@gomk/layouts'
import { NotFound } from '@gomk/components'

export const commonRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'CommonPage',
    component: BlankLayout,
    // TODO: 权限
    redirect: '/login',
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
