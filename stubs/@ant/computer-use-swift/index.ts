/** Stub for @ant/computer-use-swift — macOS-only, never loaded on Linux */
export type ComputerUseAPI = {
  captureExcluding(opts: unknown): Promise<unknown>
  captureRegion(opts: unknown): Promise<unknown>
  apps: { listInstalled(): Promise<string[]> }
  resolvePrepareCapture(opts: unknown): Promise<unknown>
}
