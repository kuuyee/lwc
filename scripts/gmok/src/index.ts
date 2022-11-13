import { cac } from 'cac'
import consola from 'consola'
import pkg from '../package.json'
import { initRunnerCommand } from './runner'
import { initChangesetCommand } from './changeset'
import { initCreateCodeWorkspaceCommand } from './create-code-workspace'
import { initCleanCommand } from './clean'

const NAME = 'gmok'

async function bootstrap() {
  const cli = cac(NAME)
  consola.info(`${pkg.name} v${pkg.version}`)

  await Promise.all([
    initCreateCodeWorkspaceCommand(cli),
    initChangesetCommand(cli),
    initRunnerCommand(cli),
    initCleanCommand(cli),
  ])

  cli.version(pkg.version)
  cli.usage(NAME)
  cli.help()
  cli.parse()
}

bootstrap().catch((err: unknown) => {
  consola.error(err)
  process.exit(1)
})
