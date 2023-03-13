import { execa } from 'execa'
import { getPackagesSync } from '@manypkg/get-packages'

export async function runScript(name: string, script: string) {
  execa('pnpm', ['--filter', `${name}`, 'run', script], {
    stdio: 'inherit',
    preferLocal: true,
  })
}

export async function turboRunScripts(names: string[], script: string) {
  const filter: string[] = []
  names.forEach((name) => {
    filter.push(...['--filter', name])
  })
  execa('turbo', ['run', script, ...filter], {
    stdio: 'inherit',
    preferLocal: true,
  })
}

export function filterAppPackages(prefix = '') {
  const { packages } = getPackagesSync('.')

  return packages.filter((pkg) => {
    return pkg.packageJson.name.startsWith(prefix)
  })
}
