import { randomUUID } from 'node:crypto'

type CacheEntry<T> = {
  value: T
  snapshotId: string
  expiresAt: number
}

export type CacheHit<T> = {
  value: T
  snapshotId: string
}

export function createTtlCache<T>(ttlMs: number) {
  const store = new Map<string, CacheEntry<T>>()

  return {
    get(key: string): CacheHit<T> | undefined {
      const entry = store.get(key)
      if (!entry) {
        return undefined
      }
      if (Date.now() > entry.expiresAt) {
        store.delete(key)
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
