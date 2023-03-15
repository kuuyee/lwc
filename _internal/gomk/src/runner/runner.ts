import prompts from 'prompts'
import { filterAppPackages, runScript } from '../utils'

export async function run(command: string, appName?: string) {
  const webApps = filterAppPackages('@apps/')
  let selectAppName = appName
  if (!selectAppName) {
    const choices = webApps.map((webApp) => {
      const name = webApp.packageJson.name
      // @ts-ignore typo
      const description = webApp.packageJson.description

      return {
        title: `${name}${description ? `(${description})` : ''}`,
        value: name,
      }
    })

    if (choices.length === 1) {
      selectAppName = choices[0].value
    } else {
      const ret = await prompts({
        type: 'select',
        name: 'app',
        message: () => `请选择需要执行的应用:`,
        choices: choices,
      })
      selectAppName = ret.app
    }
  }

  if (selectAppName) {
    await runScript(selectAppName, command)
  }
}
