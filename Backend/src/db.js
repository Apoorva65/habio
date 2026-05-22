import {DatabaseSync} from 'node:sqlite'

const db = new DatabaseSync('habits.db')

db.exec(`PRAGMA foreign_keys = ON`)

db.exec(`CREATE TABLE IF NOT EXISTS habit(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_name STRING UNIQUE NOT NULL
    )`)

db.exec(`CREATE TABLE IF NOT EXISTS completed(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_id INTEGER REFERENCES habit(id) ON DELETE CASCADE,
    completed_date DATE
    )`)

export default db;