/** Stub for @ant/computer-use-mcp/types */
export type CoordinateMode = 'pixels' | 'percent'
export type CuSubGates = {
  pixelValidation: boolean
  clipboardPasteMultiline: boolean
  mouseAnimation: boolean
  hideBeforeAction: boolean
  autoTargetDisplay: boolean
  clipboardGuard: boolean
}
export type CuPermissionRequest = { type: string; [k: string]: unknown }
export type CuPermissionResponse = { granted: boolean; [k: string]: unknown }
export const DEFAULT_GRANT_FLAGS: Record<string, boolean> = {}
