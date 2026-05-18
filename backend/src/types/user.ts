import type { WidgetPreference } from './widgetPreference.js'

export type UserPreferences = {
  widgets: WidgetPreference[]
  coins: string[]
}

export type User = {
  id: string
  name: string
  email: string
  preferences: UserPreferences | null
}

export type StoredUser = {
  id: string
  name: string
  email: string
  passwordHash: string
  preferences: UserPreferences | null
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
}

export type LoginRequest = {
  email: string
  password: string
}

export function toPublicUser(user: StoredUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    preferences: user.preferences,
  }
}
