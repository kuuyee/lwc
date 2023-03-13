import { CAC } from 'cac'
import { run } from './runner'

// 运行/构建 单个app，可以选择指定app，如果只有一个app，则直接运行
export function initRunnerCommand(cli: CAC) {
  cli
    .command('dev [app]')
    .usage('dev app')
    .action(async (app: string) => {
      await run('dev', app)
    })

  cli
    .command('build [app]')
    .usage('build app')
    .action(async (app: string) => {
      await run('build', app)
    })
}
