import Axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios'

interface createOptions extends AxiosRequestConfig {
  createConfig?: CreateAxiosDefaults
  getToken?: () => Promise<string>
  errorFunc?: (msg: string) => void
}

export function createAxios(config: createOptions) {
  const { createConfig = {}, getToken, errorFunc } = config
  const axios = Axios.create({
    timeout: 10000,
    ...createConfig,
  })

  axios.interceptors.request.use(
    async (config) => {
      const token = await getToken?.()
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    },
    (error: any) => {
      throw error
    },
  )

  // http response 拦截器
  axios.interceptors.response.use(
    (response) => {
      const { data } = response

      const msg = data?.message || data?.msg || ''
      switch (data.code) {
        case 401:
          errorFunc?.(msg)
          return Promise.reject(msg)
        case 403:
          errorFunc?.(msg || '权限不足')
          return Promise.reject(msg)
        case 500:
          errorFunc?.(msg || msg || '后台服务错误')
          return Promise.reject(msg)
        default:
          return data
      }
    },
    (err) => {
      if (err && err.response) {
        if (err.response?.data?.msg) {
          errorFunc?.(err.response.data.msg)
          return
        }
      }
      return Promise.reject(err)
    },
  )

  return {
    useGet: async (config: AxiosRequestConfig) => {
      return axios({ ...config, method: 'GET' })
    },
    usePost: async (config: AxiosRequestConfig) => {
      return axios<any>({ ...config, method: 'POST' })
    },
    useDelete: async (config: AxiosRequestConfig) => {
      return axios({ ...config, method: 'DELETE' })
    },
    usePut: async (config: AxiosRequestConfig) => {
      return axios({ ...config, method: 'PUT' })
    },
  }
}
