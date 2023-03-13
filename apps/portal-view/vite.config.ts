import { createViteConfig } from '@gomk/config-vite'

export default createViteConfig(process.cwd(), {
  server: {
    proxy: {
      '/lal-api': {
        changeOrigin: true,
        ws: true,
        target: `http://localhost:8083`,
        secure: false,
        rewrite: (path) => path.replace(new RegExp(`^/lal-api`), ''),
      },
      '/gomk': {
        changeOrigin: true,
        ws: true,
        target: `https://hc.mayday5.me/`,
        secure: true,
        // rewrite: (path) => path.replace(new RegExp(`^/gomk`), ''),
      },
    },
  },
})
