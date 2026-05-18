export const COINGECKO_API_KEY = 'YOUR_COINGECKO_API_KEY'

const PLACEHOLDER_KEY = 'YOUR_COINGECKO_API_KEY'

export const COINGECKO_BASE_URL =
  COINGECKO_API_KEY === PLACEHOLDER_KEY || COINGECKO_API_KEY === ''
    ? 'https://api.coingecko.com/api/v3'
    : 'https://pro-api.coingecko.com/api/v3'

export function getCoingeckoHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (COINGECKO_API_KEY !== PLACEHOLDER_KEY && COINGECKO_API_KEY !== '') {
    headers['x-cg-pro-api-key'] = COINGECKO_API_KEY
  }

  return headers
}
