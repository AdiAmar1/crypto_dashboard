import type { InvestorType } from '../../types/investorType'
import type { UserPreferences } from '../../types/user'
import type { WidgetPreference } from '../../types/widgetPreference'

export type OnboardingPreferences = {
  coins: string[]
  investorType: InvestorType | null
  widgets: WidgetPreference[]
}

export const initialOnboardingPreferences = (): OnboardingPreferences => ({
  coins: [],
  investorType: null,
  widgets: [],
})

export function fromUserPreferences(
  preferences: UserPreferences,
): OnboardingPreferences {
  return {
    coins: [...preferences.coins],
    investorType: preferences.investorType,
    widgets: [...preferences.widgets],
  }
}

export function toUserPreferences(
  preferences: OnboardingPreferences,
): UserPreferences {
  if (preferences.investorType === null) {
    throw new Error('Investor type is required')
  }

  return {
    coins: preferences.coins,
    widgets: preferences.widgets,
    investorType: preferences.investorType,
  }
}
