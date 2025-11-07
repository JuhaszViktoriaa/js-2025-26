import Database from "better-sqlite3";

const database = new Database("./database/database.sqlite");

database.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password_hashed TEXT, FOREIGN KEY book_id REFERENCES reviews(id), FOREIGN KEY user_id REFERENCES reviews(id))`).run();
export const getUsers =() => database.prepare(`SELECT * FROM users`).all();
export const getUser =()=> database.prepare(`SELECT * FROM users WHERE id=?`).get(id);
export const saveUser=(username, email, password_hashed)=> database.prepare(`INSERT INTO users (username, email) VALUES (?,?)`).run(username, email, password_hashed);
export const updateUser=(username, email, id)=> database.prepare(`UPDATE users SET username =?, email=? WHERE id=?`).run(username, email, id);
export const deleteUser=(id)=> database.prepare(`DELETE * FROM users WHERE id=?`).run(id);
const users = getUsers();
if(users.length == 0){
    saveUser(1, "Harry", "harry.potter@gmail.com", "jelszo123456");
    saveUser(2, "George", "georgeorwell@gmail.org", "password1984");
    saveUser(3, "Alice", "aliceinwonderland@gmail.com", "thisway123");
}