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
