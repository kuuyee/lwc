import 'virtual:svg-icons-register'
import '@gmok/styles'
import 'uno.css'
import App from './App.vue'
import { createApp } from 'vue'
import { pinia } from '@/internal'
import { router, setupRouter } from '@/router'
import { setupNaive } from './component'

const bootstrap = async () => {
  const app = createApp(App)

  app.use(pinia)

  setupNaive(app)

  setupRouter(app)

  await router.isReady()

  app.mount('#app')
}

bootstrap()
