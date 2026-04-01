/**
 * SDK tool types stub — minimal versions for compilation.
 * @internal
 */
export type ToolInput = Record<string, unknown>
export type ToolResult = {
  type: 'tool_result'
  content: string | unknown[]
  isError?: boolean
}
