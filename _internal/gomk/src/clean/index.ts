import { CAC } from 'cac'
import fs from 'fs-extra'
import path from 'path'
import { filterAppPackages } from '../utils'

export function initCleanCommand(cli: CAC) {
  cli
    .command('clean')
    .usage('clean cache')
    .option('--cache', '')
    .action(async ({ cache }: { cache: boolean }) => {
      await clean(cache)
    })
}

async function clean(cache = false) {
  const pkgs = await filterAppPackages()

  const cacheDirs = ['dist', '.turbo']

  if (!cache) {
    cacheDirs.push('node_modules')
  }

  let cleanDirs: string[] = []

  for (const pkg of pkgs) {
    cleanDirs.push(...cacheDirs.map((cacheDir) => path.join(pkg.dir, cacheDir)))
  }

  cleanDirs = cleanDirs.filter((dir) => fs.existsSync(dir))

  await Promise.all(cleanDirs.map((dir) => fs.remove(dir)))

  const rootCache = path.join(process.cwd(), 'node_modules')

  if (!cache && fs.existsSync(rootCache)) {
    await fs.remove(rootCache)
  }
}
