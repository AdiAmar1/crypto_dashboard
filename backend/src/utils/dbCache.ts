import { randomUUID } from 'node:crypto'
import { db } from '../db/database.js'
import {
  DEFAULT_CACHE_TTL_MS,
  type CacheHit,
} from './cache.js'

export { DEFAULT_CACHE_TTL_MS }
export type { CacheHit }

type CacheRow = {
  value: string
  snapshot_id: string
  expires_at: number
}

const VALID_TABLE_NAME = /^[a-zA-Z][a-zA-Z0-9_]*$/

function assertValidTableName(name: string): string {
  if (!VALID_TABLE_NAME.test(name)) {
    throw new Error(
      `Invalid cache table name "${name}": use letters, digits, and underscores only`,
    )
  }
  return name
}

function ensureCacheTable(tableName: string): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      cache_key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      snapshot_id TEXT NOT NULL,
      expires_at INTEGER NOT NULL
    );
  `)
}

export function createDBCache<T>(
  name: string,
  ttlMs: number = DEFAULT_CACHE_TTL_MS,
) {
  const tableName = assertValidTableName(name)
  ensureCacheTable(tableName)

  const selectRow = db.prepare<[string], CacheRow>(
    `SELECT value, snapshot_id, expires_at FROM ${tableName} WHERE cache_key = ?`,
  )

  const upsertEntry = db.prepare<[string, string, string, number]>(
    `INSERT INTO ${tableName} (cache_key, value, snapshot_id, expires_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(cache_key) DO UPDATE SET
       value = excluded.value,
       snapshot_id = excluded.snapshot_id,
       expires_at = excluded.expires_at`,
  )

  function rowToHit(row: CacheRow): CacheHit<T> {
    return {
      value: JSON.parse(row.value) as T,
      snapshotId: row.snapshot_id,
    }
  }

  return {
    get(key: string): CacheHit<T> | undefined {
      const row = selectRow.get(key)
      if (!row || Date.now() > row.expires_at) {
        return undefined
      }
      return rowToHit(row)
    },
    getStale(key: string): CacheHit<T> | undefined {
      const row = selectRow.get(key)
      if (!row) {
        return undefined
      }
      return rowToHit(row)
    },
    set(key: string, value: T): string {
      const snapshotId = randomUUID()
      upsertEntry.run(
        key,
        JSON.stringify(value),
        snapshotId,
        Date.now() + ttlMs,
      )
      return snapshotId
    },
  }
}
