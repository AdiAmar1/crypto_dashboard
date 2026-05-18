import type { InvestorType } from './investorType'
import type { WidgetPreference } from './widgetPreference'

export type UserPreferences = {
  widgets: WidgetPreference[]
  coins: string[]
  investorType: InvestorType
}

export type SavePreferencesPayload = {
  preferences: UserPreferences
}

export type User = {
  id: string
  name: string
  email: string
  preferences: UserPreferences | null
}
