/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite'

export interface ViteEnv {
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Record<string, string>): ViteEnv {
  const viteEnv: Partial<ViteEnv> = {}

  for (const key of Object.keys(envConf)) {
    let name = envConf[key].replace(/\\n/g, '\n') as any
    name = name === 'true' ? true : name === 'false' ? false : name

    if (key === 'VITE_PROXY' && name) {
      try {
        name = JSON.parse(name.replace(/'/g, '"'))
      } catch (error) {
        name = ''
      }
    }

    viteEnv[key] = name
    if (typeof name === 'string') {
      process.env[key] = name
    } else if (typeof name === 'object') {
      process.env[key] = JSON.stringify(name)
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
