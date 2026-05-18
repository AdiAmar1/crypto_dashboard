import { API_BASE_URL } from '../config/api'
import { fetchApi } from './fetchApi'
import type { VoteSnapshotResponse } from '../types/vote'

export async function getVoteSnapshot(
  snapshotId: string,
): Promise<VoteSnapshotResponse> {
  const params = new URLSearchParams({ snapshotId })
  const response = await fetchApi(
    `${API_BASE_URL}/api/votes?${params.toString()}`,
  )

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(payload?.error ?? 'Failed to load vote')
  }

  return response.json() as Promise<VoteSnapshotResponse>
}
