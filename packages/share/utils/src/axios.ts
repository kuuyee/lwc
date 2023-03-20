import Axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import { Api } from 'nocodb-sdk'

interface createOptions extends AxiosRequestConfig {
  createConfig?: CreateAxiosDefaults
  getToken?: () => Promise<string>
  errorFunc?: (msg: string) => void
}

interface TableMeta {
  projectName: string
  tableName: string
}

export const NOCO = 'noco'

export function createAxios(config: createOptions) {
  const { createConfig = {}, getToken, errorFunc } = config
  const axios = Axios.create({
    timeout: 10000,
    ...createConfig,
  })

  const interceptorRequestSuccess = async (config) => {
    const token = await getToken?.()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  }
  const interceptorRequestError = (error: any) => {
    throw error
  }

  const interceptorResponseSuccess = (response: any) => {
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
  }

  const interceptorResponseError = (err) => {
    if (err && err.response) {
      if (err.response?.data?.msg) {
        errorFunc?.(err.response.data.msg)
        return
      }
    }
    return Promise.reject(err)
  }

  axios.interceptors.request.use(
    interceptorRequestSuccess,
    interceptorRequestError,
  )

  // http response 拦截器
  axios.interceptors.response.use(
    interceptorResponseSuccess,
    interceptorResponseError,
  )

  function initNcApi() {
    const ncAxios = Axios.create({
      ...createConfig,
      baseURL: (createConfig?.baseURL ?? '') + '/nocodbv2',
    })

    ncAxios.interceptors.request.use(
      interceptorRequestSuccess,
      interceptorRequestError,
    )

    // http response 拦截器
    ncAxios.interceptors.response.use((data) => {
      return data
    }, interceptorResponseError)
    const ncApi = new Api()
    // @ts-ignore
    ncApi.instance = ncAxios
    return ncApi
  }

  const ncApi = initNcApi()
  const apiRequest = new NcApiRequest(ncApi)

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
    apiRequest,
  }
}

class NcApiRequest {
  private api: Api<any>
  constructor(_api) {
    this.api = _api
  }

  create(tableName: string, data: any) {
    return this.api.dbTableColumn.create(tableName, data)
  }
  insert(info: TableMeta, data = {}) {
    const { projectName, tableName } = info
    return this.api.instance.post(
      `/api/v1/db/data/noco/${projectName}/${tableName}/insert2`,
      data,
    )
  }

  getRows(
    info: TableMeta,
    query?: Record<string, any>,
    params?: Record<string, any>,
  ) {
    const { projectName, tableName } = info
    return this.api.dbTableRow.list(
      NOCO,
      projectName,
      tableName,
      query || {},
      params || {},
    )
  }
}
