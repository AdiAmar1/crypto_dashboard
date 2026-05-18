import type { VoteRequest, VoteResponse } from '../types/vote'

export async function postVote(body: VoteRequest): Promise<VoteResponse> {
  const response = await fetch('http://localhost:3000/api/votes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(payload?.error ?? 'Failed to submit vote')
  }

  return response.json() as Promise<VoteResponse>
}
