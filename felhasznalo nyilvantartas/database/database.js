const db = sqlite3("users.db");

db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT)`).run();

    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
