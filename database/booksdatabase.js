import Database from "better-sqlite3";
const bookdatabase = new Database("./database/bookdatabase.sqlite");

bookdatabase.prepare(`CREATE TABLE IF NOT EXISTS books
    (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, description TEXT, added_by DATE, FOREIGN KEY book_id REFERENCES reviews(id), FOREIGN KEY user_id REFERENCES users(id))`).run();

export const getBooks =() => bookdatabase.prepare(`SELECT * FROM books`).all();

export const getBook =(id)=> bookdatabase.prepare(`SELECT * FROM books WHERE id=?`).get(id);

export const saveBook=(title, author, description, added_by)=> bookdatabase.prepare
(`INSERT INTO books (title, author, desciption, added_by) VALUES (?,?)`).run(title, author, description, added_by);

export const updateBook=(title, author, id, desciption, added_by)=> bookdatabase.prepare(`UPDATE books SET title =?, author=?, description=?, added_by=? WHERE id=?`).run(title, author, id, desciption, added_by);

export const deleteBook=(id)=> bookdatabase.prepare(`DELETE * FROM books WHERE id=?`).run(id);

const books = getBooks();
if(books.length == 0){
    saveBook(1, "Babel", "R. F. Kuang", "dystopian low fantasy", 2017);
    saveBook(2, "Katabasis", "R. F. Kuang", "maze, low fantasy", 2025);
    saveBook(3, "Howl's Moving Castle", "D. W. Jones", "high fantasy", 2008);
    saveBook(4, "Alice in Wonderland", "Lewis Carol", "expressionist fantasy", 1865);
}