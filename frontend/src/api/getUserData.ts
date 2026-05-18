import type { User } from '../types/user'

export async function getUserData(): Promise<User> {
  const response = await fetch('http://localhost:3000/api/user/data')

  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }

  return response.json() as Promise<User>
}
