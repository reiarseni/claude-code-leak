/** Stub for @ant/computer-use-mcp — macOS-only, not available on Ubuntu */
export type ComputerUseSessionContext = Record<string, unknown>
export type CuCallToolResult = { type: string; content: unknown[] }
export type CuPermissionRequest = { type: string; [k: string]: unknown }
export type CuPermissionResponse = { granted: boolean; [k: string]: unknown }
export type ScreenshotDims = { width: number; height: number }
export type CoordinateMode = 'pixels' | 'percent'
export type CuSubGates = {
  pixelValidation: boolean
  clipboardPasteMultiline: boolean
  mouseAnimation: boolean
  hideBeforeAction: boolean
  autoTargetDisplay: boolean
  clipboardGuard: boolean
}

export const DEFAULT_GRANT_FLAGS: Record<string, boolean> = {}
export const API_RESIZE_PARAMS: Record<string, unknown> = {}

export function bindSessionContext(_ctx: ComputerUseSessionContext): void {
  throw new Error('@ant/computer-use-mcp is macOS-only')
}
export function buildComputerUseTools(_opts: unknown): unknown[] {
  return []
}
export function createComputerUseMcpServer(_opts: unknown): unknown {
  throw new Error('@ant/computer-use-mcp is macOS-only')
}
export function targetImageSize(_dims: unknown): unknown {
  throw new Error('@ant/computer-use-mcp is macOS-only')
}
