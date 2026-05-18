import type { WidgetPreference } from './widgetPreference.js'

export type User = {
  id: string
  name: string
  email: string
  preferences: WidgetPreference[] | null
}
