import { randomUUID } from 'node:crypto'

export const DEFAULT_CACHE_TTL_MS = 10 * 60 * 1000

type CacheEntry<T> = {
  value: T
  snapshotId: string
  expiresAt: number
}

export type CacheHit<T> = {
  value: T
  snapshotId: string
}

export function createTtlCache<T>(ttlMs: number = DEFAULT_CACHE_TTL_MS) {
  const store = new Map<string, CacheEntry<T>>()

  return {
    get(key: string): CacheHit<T> | undefined {
      const entry = store.get(key)
      if (!entry || Date.now() > entry.expiresAt) {
        return undefined
      }
      return { value: entry.value, snapshotId: entry.snapshotId }
    },
    getStale(key: string): CacheHit<T> | undefined {
      const entry = store.get(key)
      if (!entry) {
        return undefined
      }
      return { value: entry.value, snapshotId: entry.snapshotId }
    },
    set(key: string, value: T): string {
      const snapshotId = randomUUID()
      store.set(key, { value, snapshotId, expiresAt: Date.now() + ttlMs })
      return snapshotId
    },
  }
}
