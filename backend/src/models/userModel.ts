import { query } from '../db/database.js'
import type { StoredUser, UserPreferences } from '../types/user.js'

type UserRow = {
  id: string
  name: string
  email: string
  password_hash: string
  preferences: UserPreferences | null
}

function rowToStoredUser(row: UserRow): StoredUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    preferences: row.preferences,
  }
}

export async function findById(id: string): Promise<StoredUser | undefined> {
  const result = await query<UserRow>(
    'SELECT id, name, email, password_hash, preferences FROM users WHERE id = $1',
    [id],
  )
  const row = result.rows[0]
  return row ? rowToStoredUser(row) : undefined
}

export async function findByEmail(
  email: string,
): Promise<StoredUser | undefined> {
  const result = await query<UserRow>(
    'SELECT id, name, email, password_hash, preferences FROM users WHERE LOWER(email) = LOWER($1)',
    [email],
  )
  const row = result.rows[0]
  return row ? rowToStoredUser(row) : undefined
}

export async function create(user: StoredUser): Promise<void> {
  await query(
    `INSERT INTO users (id, name, email, password_hash, preferences)
     VALUES ($1, $2, $3, $4, $5)`,
    [user.id, user.name, user.email, user.passwordHash, user.preferences],
  )
}

export async function updatePreferences(
  userId: string,
  preferences: UserPreferences,
): Promise<StoredUser | undefined> {
  const result = await query('UPDATE users SET preferences = $1 WHERE id = $2', [
    preferences,
    userId,
  ])

  if (result.rowCount === 0) return undefined

  return findById(userId)
}
