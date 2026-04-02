/**
 * Grove stubs - Grove (ToS notification system) is disabled in this build.
 * All functions return empty/negative results so callers handle the "no grove" path.
 */

export type AccountSettings = {
  grove_enabled: boolean | null
  grove_notice_viewed_at: string | null
}

export type GroveConfig = {
  grove_enabled: boolean
  domain_excluded: boolean
  notice_is_grace_period: boolean
  notice_reminder_frequency: number | null
}

export type ApiResult<T> = { success: true; data: T } | { success: false }

export const getGroveSettings = Object.assign(
  async (): Promise<ApiResult<AccountSettings>> => ({ success: false }),
  { cache: { clear: () => {} } },
)

export const getGroveNoticeConfig = Object.assign(
  async (): Promise<ApiResult<GroveConfig>> => ({ success: false }),
  { cache: { clear: () => {} } },
)

export async function markGroveNoticeViewed(): Promise<void> {}

export async function updateGroveSettings(_groveEnabled: boolean): Promise<void> {}

export async function isQualifiedForGrove(): Promise<boolean> {
  return false
}

export function calculateShouldShowGrove(): boolean {
  return false
}

export async function checkGroveForNonInteractive(): Promise<void> {}
