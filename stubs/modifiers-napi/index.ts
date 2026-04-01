/**
 * modifiers-napi stub — keyboard modifier key detection via macOS CGEventTap.
 * All calls are no-ops on non-macOS platforms; the real module is guarded by
 * platform checks and wrapped in try-catch at all call sites.
 */
export function prewarm(): void {}
export function getModifierState(): {
  shift: boolean
  command: boolean
  control: boolean
  option: boolean
} {
  return { shift: false, command: false, control: false, option: false }
}
