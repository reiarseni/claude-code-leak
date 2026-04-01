/** Stub — only loaded when CLAUDE_CODE_VERIFY_PLAN=true */
import { z } from 'zod/v4'
import { buildTool } from '../../Tool.js'

export const VerifyPlanExecutionTool = buildTool({
  name: 'VerifyPlanExecution',
  description: 'Plan execution verification tool',
  isEnabled: () => false,
  isReadOnly: () => true,
  inputSchema: z.object({ plan: z.string() }),
  userFacingName: () => 'VerifyPlanExecution',
  async* call() {
    throw new Error('VerifyPlanExecutionTool requires CLAUDE_CODE_VERIFY_PLAN=true')
  },
  renderToolUseMessage: () => null,
  renderToolResultMessage: () => null,
  renderToolUseInChatMessage: () => null,
  async checkPermissions() {
    return { type: 'allow' as const, updatedInput: { plan: '' } }
  },
})
