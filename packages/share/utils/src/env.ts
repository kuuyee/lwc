export interface GlobalConfig {
  // 网站标题
  title: string
  // 接口地址
  apiUrl: string
  // 网站缩写
  shortName: string
}

export interface GlobalEnvConfig {
  // 网站标题
  VITE_GLOB_APP_TITLE: string
  // 接口地址
  VITE_GLOB_API_URL: string
  // 网站缩写
  VITE_GLOB_APP_SHORT_NAME: string
}

export function getGlobalConfig(env: Record<string, string>) {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME } =
    getAppConfig(env)

  // 获取取全局配置
  const glob: Readonly<GlobalConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
  }
  return glob as Readonly<GlobalConfig>
}

function getAppConfig(env: Record<string, string>) {
  const ENV_NAME = getAppConfigFileName(env)

  const ENV = (
    env.DEV
      ? // 获取全局配置（打包时会独立提取配置）
        env
      : window[ENV_NAME]
  ) as GlobalEnvConfig

  const { VITE_GLOB_APP_SHORT_NAME } = ENV

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    console.warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    )
  }

  return ENV
}

/**
 * 获取配置文件变量名
 * @param env
 */
function getAppConfigFileName(env: Record<string, any>) {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '')
}
