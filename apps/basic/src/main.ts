import 'virtual:svg-icons-register'
import '@gmok/styles'
import 'uno.css'
import App from './App.vue'
import { createApp } from 'vue'
import { pinia } from '@/internal'
import { router, setupRouter } from '@/router'

const bootstrap = async () => {
  const app = createApp(App)

  app.use(pinia)

  setupRouter(app)

  await router.isReady()

  app.mount('#app')
}

bootstrap()
