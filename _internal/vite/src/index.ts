import type { UserConfig, UserConfigFn } from 'vite'
import { loadEnv, defineConfig } from 'vite'
import { wrapperEnv, resolveProxy } from './utils'
import { resolve } from 'path'
import { configVitePlugins } from './plugins'

export type ViteConfig = Promise<UserConfig | UserConfigFn>

export async function createViteConfig(
  cwd: string = process.cwd(),
): Promise<UserConfig | UserConfigFn> {
  return defineConfig(async ({ command, mode }) => {
    const root = cwd
    const env = loadEnv(mode, root)

    // The boolean type read by loadEnv is a string. This function can be converted to boolean type
    const viteEnv = wrapperEnv(env)

    const { VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv

    const commonConfig: UserConfig = {
      root,
      base: VITE_PUBLIC_PATH,
      resolve: {
        alias: {
          '@/': `${resolve(root, 'src')}/`,
        },
      },
      server: {
        host: true,
        proxy: resolveProxy(VITE_PROXY),
      },
      esbuild: {
        charset: 'utf8',
        legalComments: 'none',
        pure: ['console.log', 'debugger'],
      },
      build: {
        reportCompressedSize: false,
        sourcemap: false,
        outDir: 'dist',
        chunkSizeWarningLimit: 2048,
        // rollupOptions: {
        //   output: {
        //     manualChunks: {
        //        vue: ['vue', 'pinia', 'vue-router'],
        //     },
        //   },
        // },
      },
      optimizeDeps: {
        include: ['dayjs/locale/en', 'dayjs/locale/zh-cn'],
      },
      plugins: await configVitePlugins(root, viteEnv, command === 'build'),
    }

    return commonConfig
  })
}
