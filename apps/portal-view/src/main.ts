import App from './App.vue'
import { router } from '@/router'
import { bootstrap } from '@gmok/bootstrap'

//
;(async () => {
  await bootstrap(App, {
    appName: 'portal-view',
    router,
  })
})()
