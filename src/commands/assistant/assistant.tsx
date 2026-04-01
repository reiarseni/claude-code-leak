/** Stub — KAIROS assistant install wizard (not available externally) */
import React from 'react'
import { homedir } from 'os'
import { join } from 'path'

export async function computeDefaultInstallDir(): Promise<string> {
  return join(homedir(), '.claude-assistant')
}

export function NewInstallWizard(_props: {
  defaultDir: string
  onInstalled: (dir: string) => void
  onCancel: () => void
  onError: (message: string) => void
}): React.ReactElement | null {
  return null
}
