/** Types for file persistence (missing from leaked source) */
export const DEFAULT_UPLOAD_CONCURRENCY = 5
export const FILE_COUNT_LIMIT = 100
export const OUTPUTS_SUBDIR = 'outputs'

export type TurnStartTime = number
export type PersistedFile = {
  path: string
  fileId: string
  size: number
}
export type FailedPersistence = {
  path: string
  error: string
}
export type FilesPersistedEventData = {
  succeeded: PersistedFile[]
  failed: FailedPersistence[]
  totalFiles: number
  turnStartTime: TurnStartTime
}
