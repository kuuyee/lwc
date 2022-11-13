import { defineStore } from 'pinia'
import { pinia } from '@gmok/utils'

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
  },
})

export function useUserStoreWithOut() {
  return useUserStore(pinia)
}
