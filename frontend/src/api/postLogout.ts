import { fetchApi } from './fetchApi'

export async function postLogout(): Promise<void> {
  const response = await fetchApi('http://localhost:3000/api/user/logout', {
    method: 'POST',
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(payload?.error ?? 'Failed to sign out')
  }
}
