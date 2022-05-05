import type { UserConfig, UserConfigFn } from 'vite'
import { loadEnv, defineConfig } from 'vite'
import { wrapperEnv, resolveProxy } from './utils'
import { resolve } from 'path'
import { configVitePlugins } from './plugins'

export type ViteConfig = Promise<UserConfig | UserConfigFn>

export async function createViteConfig(
  cwd: string,
): Promise<UserConfig | UserConfigFn> {
  return defineConfig(async ({ command, mode }) => {
    const root = cwd
    const env = loadEnv(mode, root)

    // The boolean type read by loadEnv is a string. This function can be converted to boolean type
    const viteEnv = wrapperEnv(env)

    const { VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

    const commonConfig: UserConfig = {
      root,
      base: VITE_PUBLIC_PATH,
      resolve: {
        alias: {
          '@/': `${resolve(root, 'src')}/`,
          vue: 'vue/dist/vue.esm-bundler.js',
        },
      },
      server: {
        port: 3000,
        host: true,
        proxy: resolveProxy(VITE_PROXY),
      },
      esbuild: {
        pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
      },
      build: {
        target: 'chrome80',
        cssTarget: 'chrome80',
        outDir: 'dist',
        brotliSize: false,
        chunkSizeWarningLimit: 2048,
        rollupOptions: {
          output: {
            manualChunks: {
              vue: ['vue', 'pinia', 'vue-router'],
            },
          },
        },
      },
      optimizeDeps: {
        include: [
          'dayjs/locale/en',
          'dayjs/locale/zh-cn',
          'element-plus/lib/locale/lang/zh-cn',
          'element-plus/es',
          'element-plus/es/components/config-provider/style/index',
        ],
      },
      plugins: await configVitePlugins(root, viteEnv, command === 'build'),
    }

    return commonConfig
  })
}
