import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import Database from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import { genSaltSync, hashSync } from 'bcrypt-ts';

// Cambia la conexión a SQLite
const sqlite = new Database('db.sqlite');
const db = drizzle(sqlite);

// Define la tabla usando sqliteTable
const users = sqliteTable('User', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email', { length: 64 }),
  password: text('password', { length: 64 }),
});

export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);
  return await db.insert(users).values({ email, password: hash });
}

// SQLite crea la tabla automáticamente si no existe, pero puedes forzar la creación:
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS "User" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(64),
    password VARCHAR(64)
  );
`);
