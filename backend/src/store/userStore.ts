import type { StoredUser } from '../types/user.js'

const usersById = new Map<string, StoredUser>()
const userIdByEmail = new Map<string, string>()

export function findByEmail(email: string): StoredUser | undefined {
  const id = userIdByEmail.get(email)
  if (!id) return undefined
  return usersById.get(id)
}

export function create(user: StoredUser): void {
  usersById.set(user.id, user)
  userIdByEmail.set(user.email, user.id)
}
