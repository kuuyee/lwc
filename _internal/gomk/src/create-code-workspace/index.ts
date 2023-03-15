import type { CAC } from 'cac'
import fs from 'fs-extra'
import path from 'node:path'
import colors from 'picocolors'
import consola from 'consola'
import { getPackages } from '@manypkg/get-packages'

export const MONOREPO_CODE_WORKSPACE_FILE = 'monorepo.code-workspace'

async function generatorVscodeCodeWorksapceFile(cwd = process.cwd()) {
  const { packages, root } = await getPackages(cwd)

  const folders = packages.map((pkg) => {
    return {
      name: pkg.packageJson.name,
      path: path.relative(root.dir || cwd, pkg.dir),
    }
  })
  folders.filter(Boolean)

  folders.push({
    name: 'root',
    path: '.',
  })
  return folders
}

export async function createCodeWorksapceFile(cwd: string = process.cwd()) {
  const folders = await generatorVscodeCodeWorksapceFile(cwd)

  fs.outputJSONSync(
    path.join(cwd, MONOREPO_CODE_WORKSPACE_FILE),
    { folders },
    { encoding: 'utf-8', spaces: 2 },
  )

  consola.success(colors.green(`${MONOREPO_CODE_WORKSPACE_FILE} is created!`))
}

export function initCreateCodeWorkspaceCommand(cli: CAC) {
  cli
    .command('create-code-workspace')
    .usage('创建 vscode code workspace 文件.')
    .action(() => createCodeWorksapceFile())
}
