/** Stub for @ant/computer-use-input — macOS-only, never loaded on Linux */
export type ComputerUseInputAPI = {
  key(keys: string[]): Promise<void>
  keys(keys: string[]): Promise<void>
  mouse(opts: unknown): Promise<void>
  type(text: string): Promise<void>
}
export type ComputerUseInput =
  | ({ isSupported: true } & ComputerUseInputAPI)
  | { isSupported: false }
