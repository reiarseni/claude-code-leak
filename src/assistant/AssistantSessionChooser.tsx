/** Stub — KAIROS assistant session chooser (not available externally) */
import React from 'react'
import type { AssistantSession } from './sessionDiscovery.js'

export function AssistantSessionChooser(_props: {
  sessions: AssistantSession[]
  onSelect: (id: string) => void
  onCancel: () => void
}): React.ReactElement | null {
  return null
}
