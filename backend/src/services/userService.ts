import type { User, UserPreferences } from '../types/user.js'

export async function register(): Promise<string> {
  return 'register'
}

export async function login(): Promise<string> {
  return 'login'
}

export async function getUserData(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    preferences: {
      widgets: ['MARKET_NEWS', 'COIN_PRICES', 'DAILY_INSIGHTS', 'FUN_MEME'],
      coins: ['bitcoin'],
    },
  }
}

export async function savePreferences(
  _preferences: UserPreferences,
): Promise<string> {
  return 'savePreferences'
}
