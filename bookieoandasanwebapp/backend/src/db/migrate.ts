import fs from 'fs';
import path from 'path';
import db from './database';

const migrationsDir = path.join(__dirname, '../../migrations');

db.exec(`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    version    INTEGER PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

const applied = new Set<number>(
  (db.prepare('SELECT version FROM schema_migrations').all() as { version: number }[])
    .map(r => r.version)
);

const files = fs
  .readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

for (const file of files) {
  const version = parseInt(file.split('_')[0], 10);
  if (applied.has(version)) continue;

  const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
  db.exec(sql);
  console.log(`Applied migration: ${file}`);
}

console.log('Migrations complete.');
