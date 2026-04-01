/** Stub — ant-internal tool */
import { z } from 'zod/v4'
import { buildTool } from '../../Tool.js'

export const SuggestBackgroundPRTool = buildTool({
  name: 'SuggestBackgroundPR',
  description: 'Internal tool (not available in external builds)',
  isEnabled: () => false,
  isReadOnly: () => true,
  inputSchema: z.object({ suggestion: z.string() }),
  userFacingName: () => 'SuggestBackgroundPR',
  async* call() {
    throw new Error('SuggestBackgroundPRTool is not available in external builds')
  },
  renderToolUseMessage: () => null,
  renderToolResultMessage: () => null,
  renderToolUseInChatMessage: () => null,
  async checkPermissions() {
    return { type: 'allow' as const, updatedInput: { suggestion: '' } }
  },
})
