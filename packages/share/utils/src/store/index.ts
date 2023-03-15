import { createPinia } from 'pinia'
import { createPersistPlugin } from './persist'

const pinia = createPinia()

pinia.use(createPersistPlugin({ namespace: 'gomk' }))

export { pinia }
