import type { VoteSnapshotResponse } from '../types/vote'

export async function getVoteSnapshot(
  snapshotId: string,
): Promise<VoteSnapshotResponse> {
  const params = new URLSearchParams({ snapshotId })
  const response = await fetch(
    `http://localhost:3000/api/votes?${params.toString()}`,
  )

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(payload?.error ?? 'Failed to load vote')
  }

  return response.json() as Promise<VoteSnapshotResponse>
}
