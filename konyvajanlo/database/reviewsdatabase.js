import Database from "better-sqlite3";
const bookdatabase = new Database("./database/bookdatabase.sqlite");

bookdatabase.prepare(`CREATE TABLE IF NOT EXISTS reviews
    (id INTEGER PRIMARY KEY AUTOINCREMENT, book_id INTEGER, user_id INTEGER, rating FLOAT, comment TEXT, FOREIGN KEY book_id REFERENCES books(id), FOREIGN KEY user_id REFERENCES users(id))`).run();

export const getReviews =() => bookdatabase.prepare(`SELECT * FROM reviews`).all();

export const getReview =()=> bookdatabase.prepare(`SELECT * FROM reviews WHERE id=?`).get(id);

export const saveReview=(book_id, user_id, rating, comment)=> bookdatabase.prepare(`INSERT INTO reviews
    (book_id, user_id,rating, comment) VALUES (?,?)`).run(book_id, user_id, rating, comment);

export const updateReview=(book_id, user_id, id,rating, comment)=> bookdatabase.prepare(`UPDATE
    reviews SET book_id =?, user_id=?, rating=?, comment=? WHERE id=?`).run(book_id, user_id, id,rating, comment);

export const deleteReview=(id)=> bookdatabase.prepare(`DELETE * FROM books WHERE id=?`).run(id);

const reviews = getReviews();
if(reviews.length == 0){
    saveBook(1, 4, 2, 4.3, "splendid novel!");
    saveBook(2, 2, 3, 2.6, "could've been better...");
    saveBook(3, 3, 1, 5.0, "the best book in the world!");
    saveBook(4, 1, 2, 1.7, "worst novel i've ever read! 0/10!");
}