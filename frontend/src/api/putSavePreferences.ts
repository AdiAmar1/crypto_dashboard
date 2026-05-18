import { API_BASE_URL } from '../config/api'
import { fetchApi } from './fetchApi'
import type { SavePreferencesPayload, User } from '../types/user'

export async function putSavePreferences(
  body: SavePreferencesPayload,
): Promise<User> {
  const response = await fetchApi(`${API_BASE_URL}/api/user/preferences`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (response.status === 401) {
    throw new Error('Authentication required')
  }

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(payload?.error ?? 'Failed to save preferences')
  }

  return response.json() as Promise<User>
}
