/**
 * Shim for `bun:bundle` feature flags.
 * In Bun's actual bundler this is resolved at compile time via DCE.
 * This shim stubs all features to false so feature-gated code is
 * treated as dead code at runtime and not executed.
 */
export function feature(_name: string): boolean {
  return false
}
