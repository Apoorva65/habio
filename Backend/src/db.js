import {DatabaseSync} from 'node:sqlite'

const db = new DatabaseSync(':memory:')

db.exec(`CREATE TABLE habit(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_name STRING UNIQUE NOT NULL
    )`)

db.exec(`CREATE TABLE completed(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_id INTEGER REFERENCES habit(id),
    completed_date DATE
    )`)

export default db;