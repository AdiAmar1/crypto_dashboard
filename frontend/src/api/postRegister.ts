import { API_BASE_URL } from '../config/api'
import { fetchApi } from './fetchApi'
import type { SignupRequest } from '../types/auth'
import type { User } from '../types/user'

export async function postRegister(body: SignupRequest): Promise<User> {
  const response = await fetchApi(`${API_BASE_URL}/api/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(payload?.error ?? 'Failed to create account')
  }

  return response.json() as Promise<User>
}
