/** Stub for @ant/claude-for-chrome-mcp — not publicly available */
export type PermissionMode = 'default' | 'auto' | 'bypassPermissions' | 'plan'
export type Logger = {
  log(...args: unknown[]): void
  error(...args: unknown[]): void
}
export type ClaudeForChromeContext = {
  getSocketPaths(): string[]
  [k: string]: unknown
}

// BROWSER_TOOLS: minimal shape — callers only read `.name`
export const BROWSER_TOOLS: Array<{ name: string; description?: string }> = []

export function createClaudeForChromeMcpServer(_opts: unknown): unknown {
  throw new Error('@ant/claude-for-chrome-mcp is not available on this platform')
}
