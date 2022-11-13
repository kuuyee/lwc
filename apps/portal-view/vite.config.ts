import type { ViteConfig } from '@gmok/config-vite'
import { createViteConfig } from '@gmok/config-vite'

export default createViteConfig(process.cwd()) as ViteConfig
