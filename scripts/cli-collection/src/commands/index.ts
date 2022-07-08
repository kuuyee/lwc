import type { CAC } from 'cac'
import { initCreateCodeWorkspaceCommand } from './create-code-workspace'

export function initCommands(cli: CAC) {
  Promise.all([initCreateCodeWorkspaceCommand(cli)])
}
