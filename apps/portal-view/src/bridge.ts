import { createAxios } from '@gomk/utils'
import { createDiscreteApi } from 'naive-ui'
import { useUserStoreWithOut } from '@/store/user'

const { useDelete, useGet, usePost, usePut } = createAxios({
  getToken: async () => {
    const userStore = useUserStoreWithOut()
    return userStore.getToken
  },
  createConfig: {
    baseURL: import.meta.env.VITE_BASE_URL,
  },
  errorFunc: (msg: string) => {
    const { message } = createDiscreteApi(['message'])
    message?.error(msg)
  },
})

export { useDelete, useGet, usePost, usePut }
