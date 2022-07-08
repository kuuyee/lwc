import { cac } from 'cac'
import consola from 'consola'
import pkg from '../package.json'
import { initCommands } from './commands'

const NAME = 'cc'

async function bootstrap() {
  const cli = cac(NAME)
  consola.info(`${pkg.name} v${pkg.version}`)

  initCommands(cli)

  cli.version(pkg.version)
  cli.usage(NAME)
  cli.help()
  cli.parse()
}

bootstrap().catch((err: unknown) => {
  consola.error(err)
  process.exit(1)
})
