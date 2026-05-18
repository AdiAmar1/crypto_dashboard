import { API_BASE_URL } from '../config/api'
import { fetchApi } from './fetchApi'

export async function postLogout(): Promise<void> {
  const response = await fetchApi(`${API_BASE_URL}/api/user/logout`, {
    method: 'POST',
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(payload?.error ?? 'Failed to sign out')
  }
}
