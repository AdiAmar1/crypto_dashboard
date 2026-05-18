import { db } from '../db/database.js'
import type { StoredUser, UserPreferences } from '../types/user.js'

type UserRow = {
  id: string
  name: string
  email: string
  password_hash: string
  preferences: string | null
}

const selectById = db.prepare<[string], UserRow>(
  'SELECT id, name, email, password_hash, preferences FROM users WHERE id = ?',
)

const selectByEmail = db.prepare<[string], UserRow>(
  'SELECT id, name, email, password_hash, preferences FROM users WHERE email = ? COLLATE NOCASE',
)

const insertUser = db.prepare<
  [string, string, string, string, string | null]
>(
  'INSERT INTO users (id, name, email, password_hash, preferences) VALUES (?, ?, ?, ?, ?)',
)

const updatePreferencesStmt = db.prepare<[string | null, string]>(
  'UPDATE users SET preferences = ? WHERE id = ?',
)

function rowToStoredUser(row: UserRow): StoredUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    preferences: row.preferences
      ? (JSON.parse(row.preferences) as UserPreferences)
      : null,
  }
}

export function findById(id: string): StoredUser | undefined {
  const row = selectById.get(id)
  return row ? rowToStoredUser(row) : undefined
}

export function findByEmail(email: string): StoredUser | undefined {
  const row = selectByEmail.get(email)
  return row ? rowToStoredUser(row) : undefined
}

export function create(user: StoredUser): void {
  const preferencesJson = user.preferences
    ? JSON.stringify(user.preferences)
    : null

  insertUser.run(
    user.id,
    user.name,
    user.email,
    user.passwordHash,
    preferencesJson,
  )
}

export function updatePreferences(
  userId: string,
  preferences: UserPreferences,
): StoredUser | undefined {
  const preferencesJson = JSON.stringify(preferences)
  const result = updatePreferencesStmt.run(preferencesJson, userId)

  if (result.changes === 0) return undefined

  return findById(userId)
}
