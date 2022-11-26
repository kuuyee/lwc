import type { DefineComponent } from 'vue'
import '@gmok/design'
import 'virtual:svg-icons-register'
import 'uno.css'
import { createApp } from 'vue'
import { Router } from 'vue-router'
import { pinia } from '@gmok/utils'
import { setupNaive } from './naive'

export interface BootstrapOptions {
  appName: string
  router: Router
}

export async function bootstrap(
  // eslint-disable-next-line
  App: DefineComponent<{}, {}, any>,
  { router }: BootstrapOptions,
) {
  const app = createApp(App)

  app.use(pinia)

  setupNaive(app)

  app.use(router)

  await router.isReady()

  app.mount('#app')
}
