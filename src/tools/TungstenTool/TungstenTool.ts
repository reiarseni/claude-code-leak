/** Stub — TungstenTool is an Anthropic-internal tool, only loaded for ant users */
import { z } from 'zod/v4'
import { buildTool } from '../../Tool.js'

export const TungstenTool = buildTool({
  name: 'Tungsten',
  description: 'Internal Anthropic tool (not available in external builds)',
  isEnabled: () => false,
  isReadOnly: () => true,
  inputSchema: z.object({ input: z.string() }),
  userFacingName: () => 'Tungsten',
  async* call() {
    throw new Error('TungstenTool is not available in external builds')
  },
  renderToolUseMessage: () => null,
  renderToolResultMessage: () => null,
  renderToolUseInChatMessage: () => null,
  async checkPermissions() {
    return { type: 'allow' as const, updatedInput: { input: '' } }
  },
})
