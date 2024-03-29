import type { PluginOption } from 'vite'
import type { ViteEnv } from './utils'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import purgeIcons from 'vite-plugin-purge-icons'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import {
  presetMini,
  presetIcons,
  presetUno,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import visualizer from 'rollup-plugin-visualizer'
import compressPlugin from 'vite-plugin-compression'

export async function configVitePlugins(
  root: string,
  viteEnv: ViteEnv,
  isBuild: boolean,
) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } =
    viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    Unocss({
      presets: [
        presetIcons({ scale: 1.2, warn: true }),
        presetMini(),
        presetUno(),
        presetTypography(),
        presetWebFonts({
          fonts: {
            sans: 'DM Sans',
            serif: 'DM Serif Display',
            mono: 'DM Mono',
          },
        }),
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
      safelist: 'prose prose-sm m-auto text-left'.split(' '),
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      svgoOptions: isBuild,
    }),
  ]

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig())

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      ),
    )
  }

  return vitePlugins
}

export function configCompressPlugin(
  compress: 'gzip' | 'brotli' | 'none',
  deleteOriginFile = false,
) {
  const compressList = compress.split(',')

  const plugins: PluginOption[] = []

  if (compressList.includes('gzip')) {
    plugins.push(compressPlugin({ deleteOriginFile }))
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        algorithm: 'brotliCompress',
        deleteOriginFile,
      }),
    )
  }
  return plugins
}

/**
 * @see https://github.com/btd/rollup-plugin-visualizer
 */

export function configVisualizerConfig() {
  if (process.env.REPORT === 'true') {
    const visualizerPlugin = visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
    return visualizerPlugin as PluginOption
  }
}
