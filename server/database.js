import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'gestures.db'));

export function initDatabase() {
  // Create gestures table
  db.exec(`
    CREATE TABLE IF NOT EXISTS gestures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gesture_type TEXT NOT NULL,
      confidence REAL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      metadata TEXT
    )
  `);

  console.log('Database initialized successfully');
}

export function getAllGestures() {
  const stmt = db.prepare('SELECT * FROM gestures ORDER BY timestamp DESC');
  return stmt.all();
}

export function getGesturesByDateRange(startDate, endDate) {
  const stmt = db.prepare(`
    SELECT * FROM gestures 
    WHERE timestamp BETWEEN ? AND ? 
    ORDER BY timestamp DESC
  `);
  return stmt.all(startDate, endDate);
}

export function getGesturesByType(gestureType) {
  const stmt = db.prepare('SELECT * FROM gestures WHERE gesture_type = ? ORDER BY timestamp DESC');
  return stmt.all(gestureType);
}

export function addGesture(gestureType, confidence, metadata = null) {
  const stmt = db.prepare(`
    INSERT INTO gestures (gesture_type, confidence, metadata)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(gestureType, confidence, metadata ? JSON.stringify(metadata) : null);
  return result.lastInsertRowid;
}

export function deleteGesture(id) {
  const stmt = db.prepare('DELETE FROM gestures WHERE id = ?');
  const result = stmt.run(id);
  return result.changes;
}

export function getGestureStats() {
  const stmt = db.prepare(`
    SELECT 
      gesture_type,
      COUNT(*) as count,
      AVG(confidence) as avg_confidence,
      MAX(timestamp) as last_seen
    FROM gestures
    GROUP BY gesture_type
  `);
  return stmt.all();
}

export default db;
