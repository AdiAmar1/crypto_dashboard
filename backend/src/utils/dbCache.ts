import { randomUUID } from 'node:crypto'
import { query } from '../db/database.js'
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

async function ensureCacheTable(tableName: string): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      cache_key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      snapshot_id TEXT NOT NULL,
      expires_at BIGINT NOT NULL
    );
  `)
}

function rowToHit<T>(row: CacheRow): CacheHit<T> {
  return {
    value: JSON.parse(row.value) as T,
    snapshotId: row.snapshot_id,
  }
}

export function createDBCache<T>(
  name: string,
  ttlMs: number = DEFAULT_CACHE_TTL_MS,
) {
  const tableName = assertValidTableName(name)
  let tableReady: Promise<void> | undefined

  function ready(): Promise<void> {
    if (!tableReady) {
      tableReady = ensureCacheTable(tableName)
    }
    return tableReady
  }

  return {
    async get(key: string): Promise<CacheHit<T> | undefined> {
      await ready()
      const result = await query<CacheRow>(
        `SELECT value, snapshot_id, expires_at FROM ${tableName} WHERE cache_key = $1`,
        [key],
      )
      const row = result.rows[0]
      if (!row || Date.now() > row.expires_at) {
        return undefined
      }
      return rowToHit(row)
    },
    async getStale(key: string): Promise<CacheHit<T> | undefined> {
      await ready()
      const result = await query<CacheRow>(
        `SELECT value, snapshot_id, expires_at FROM ${tableName} WHERE cache_key = $1`,
        [key],
      )
      const row = result.rows[0]
      if (!row) {
        return undefined
      }
      return rowToHit(row)
    },
    async set(key: string, value: T): Promise<string> {
      await ready()
      const snapshotId = randomUUID()
      await query(
        `INSERT INTO ${tableName} (cache_key, value, snapshot_id, expires_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (cache_key) DO UPDATE SET
           value = EXCLUDED.value,
           snapshot_id = EXCLUDED.snapshot_id,
           expires_at = EXCLUDED.expires_at`,
        [key, JSON.stringify(value), snapshotId, Date.now() + ttlMs],
      )
      return snapshotId
    },
  }
}
