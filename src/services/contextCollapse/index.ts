/** Stub — context collapse feature (behind CONTEXT_COLLAPSE feature flag) */
export type CollapseStats = {
  summarized: number
  total: number
  isActive: boolean
}

export function getStats(): CollapseStats {
  return { summarized: 0, total: 0, isActive: false }
}

export function subscribe(_listener: () => void): () => void {
  return () => {}
}

export function isContextCollapseEnabled(): boolean {
  return false
}
