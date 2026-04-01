/** Stub — snip-compact feature, only used behind HISTORY_SNIP feature flag */
export function isSnipRuntimeEnabled(): boolean {
  return false
}
export function shouldNudgeForSnips(_messages: unknown[]): boolean {
  return false
}
