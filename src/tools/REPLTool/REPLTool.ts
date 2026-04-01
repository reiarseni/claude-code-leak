/** Stub — REPLTool is ant-internal, only loaded for USER_TYPE=ant */
import { z } from 'zod/v4'
import { buildTool } from '../../Tool.js'

export const REPLTool = buildTool({
  name: 'repl',
  description: 'Internal REPL tool (not available in external builds)',
  isEnabled: () => false,
  isReadOnly: () => true,
  inputSchema: z.object({ code: z.string() }),
  userFacingName: () => 'REPL',
  async* call() {
    throw new Error('REPLTool is not available in external builds')
  },
  renderToolUseMessage: () => null,
  renderToolResultMessage: () => null,
  renderToolUseInChatMessage: () => null,
  async checkPermissions() {
    return { type: 'allow' as const, updatedInput: { code: '' } }
  },
})
