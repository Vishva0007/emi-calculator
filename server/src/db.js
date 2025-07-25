import Database from 'better-sqlite3';
import path from 'path';
const db = new Database(path.resolve('emi.db'));
export default db;
