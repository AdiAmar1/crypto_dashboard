import pg from 'pg'

const { Pool } = pg

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required')
}

const isLocalDatabase =
  databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1')

const pool = new Pool({
  connectionString: databaseUrl,
  ...(isLocalDatabase ? {} : { ssl: { rejectUnauthorized: false } }),
})

const USERS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    preferences JSONB
  );
`

export async function initDatabase(): Promise<void> {
  await pool.query(USERS_TABLE_SQL)
}

async function query<R extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<pg.QueryResult<R>> {
  return pool.query<R>(text, params)
}

export { pool, query }
