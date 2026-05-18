import { mkdirSync } from 'node:fs'
import path from 'node:path'
import Database, { type Database as SqliteDatabase } from 'better-sqlite3'

const defaultPath = path.join('data', 'app.sqlite')
const dbPath = process.env.DATABASE_PATH ?? defaultPath

mkdirSync(path.dirname(dbPath), { recursive: true })

const db: SqliteDatabase = new Database(dbPath)

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    preferences TEXT
  );
`)

export { db }
