import { defineStore } from 'pinia'
import { pinia } from '@gomk/utils'
import { usePost } from '@/bridge'

export interface UserInfo {
  username: string
}

interface UserState {
  userInfo: UserInfo | null
  token?: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  persist: {
    strategies: [
      {
        // 需要持久化的状态
        paths: ['userInfo', 'token'],
      },
    ],
  },
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || ({} as UserInfo)
    },
    getToken(): string {
      return this.token as string
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
    },
    async login(info: { username: string; password: string }) {
      const { username, password } = info

      const { data } = await usePost({
        url: '/auth/login',
        data: {
          username,
          password,
        },
      })
      const token = data?.access_token ?? null
      this.setToken(token)
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(pinia)
}
