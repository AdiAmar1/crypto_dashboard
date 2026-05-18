import { API_BASE_URL } from '../config/api'
import { fetchApi } from './fetchApi'
import type { VoteRequest, VoteResponse } from '../types/vote'

export async function postVote(body: VoteRequest): Promise<VoteResponse> {
  const response = await fetchApi(`${API_BASE_URL}/api/votes`, {
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
