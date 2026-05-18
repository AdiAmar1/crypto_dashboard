import { API_BASE_URL } from '../config/api'
import { fetchApi } from './fetchApi'
import type { User } from '../types/user'

export async function getUserData(): Promise<User> {
  const response = await fetchApi(`${API_BASE_URL}/api/user/data`)

  if (response.status === 401) {
    throw new Error('Authentication required')
  }

  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }

  return response.json() as Promise<User>
}
