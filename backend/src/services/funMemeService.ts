import type { FunMemeResult } from '../types/funMeme.js'
import { createDBCache } from '../utils/dbCache.js'

const CACHE_TTL_MS = 60_000
const funMemeCache = createDBCache<{ url: string }>('fun_meme', CACHE_TTL_MS)
const CACHE_KEY = 'meme'

const MEME_URLS: string[] = [
  'https://blog.breet.io/wp-content/uploads/2026/02/d751998e0a6ce24e2a0f74276bd5df97.jpg',
  'https://blog.breet.io/wp-content/uploads/2026/02/fd3b0eb70a3cb0808a539bc334c8ea20.jpg',
  'https://blog.breet.io/wp-content/uploads/2026/02/5570af21221a83fe7251c8c6dd1e6c42.jpg',
  'https://blog.breet.io/wp-content/uploads/2026/02/869b1dca5d59da1a38cca4d481232527.jpg',
  'https://blog.breet.io/wp-content/uploads/2026/02/e4dd2a1bbf6280661edf7fee19c76875.jpg',
  'https://blog.breet.io/wp-content/uploads/2026/02/97aba26072a529c76d74de675560ef36.jpg',
]

export async function getFunMeme(): Promise<FunMemeResult> {
  const cached = await funMemeCache.get(CACHE_KEY)
  if (cached) {
    return { ...cached.value, snapshotId: cached.snapshotId }
  }

  const index = Math.floor(Math.random() * MEME_URLS.length)
  const payload = { url: MEME_URLS[index]! }
  const snapshotId = await funMemeCache.set(CACHE_KEY, payload)
  return { ...payload, snapshotId }
}
