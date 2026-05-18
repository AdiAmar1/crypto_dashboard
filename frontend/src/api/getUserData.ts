import type { User } from '../types/user'

export async function getUserData(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    preferences: ['MARKET_NEWS', 'COIN_PRICES', 'DAILY_INSIGHTS', 'FUN_MEME'],
  }
}
