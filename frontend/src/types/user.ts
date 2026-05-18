import type { WidgetPreference } from './widgetPreference'

export type User = {
  id: string
  name: string
  email: string
  preferences: WidgetPreference[]
}
