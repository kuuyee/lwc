import App from './App.vue'
import { router } from '@/router'
import { bootstrap } from '@gomk/bootstrap'
//
;(async () => {
  await bootstrap(App, {
    appName: 'portal-view',
    router,
  })
})()
