/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite'

export interface ViteEnv {
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
  VITE_DROP_CONSOLE: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Record<string, string>): ViteEnv {
  const viteEnv: Partial<ViteEnv> = {}

  for (const key of Object.keys(envConf)) {
    let realName = envConf[key].replace(/\\n/g, '\n')
    realName =
      realName === 'true' ? true : realName === 'false' ? false : realName

    if (key === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'))
      } catch (error) {
        realName = ''
      }
    }

    viteEnv[key] = realName
    if (typeof realName === 'string') {
      process.env[key] = realName
    } else if (typeof realName === 'object') {
      process.env[key] = JSON.stringify(realName)
    }
  }
  return viteEnv as ViteEnv
}

/**
 * Configure according to the proxy list
 * @param proxyList
 */
export function resolveProxy(proxyList: [string, string][] = []) {
  const proxy: Record<string, ProxyOptions> = {}
  for (const [prefix, target] of proxyList) {
    const isHttps = /^https:\/\//.test(target)
    // https://github.com/http-party/node-http-proxy#options
    proxy[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    }
  }
  return proxy
}
