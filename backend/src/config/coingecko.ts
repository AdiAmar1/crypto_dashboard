export const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY ?? ''

export const COINGECKO_BASE_URL = process.env.COINGECKO_BASE_URL ?? ''
   

export function getCoingeckoHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (COINGECKO_API_KEY !== '') {
    headers['x-cg-demo-api-key'] = COINGECKO_API_KEY
  }

  return headers
}
