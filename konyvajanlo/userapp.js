import express from "express";
import * as database from "./database.userdatabase.js";
import Database from "better-sqlite3";

//PASSWORD HASH HIANYZIK, VALTOZOK

const PORT = 3000;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});

app.get("/api/books", (req, res) =>{
    const books = database.getBooks();
    res.status(200).json(books);
});
app.get("/api/books/:id", (req, res) =>{                                //GET BOOK
    const id=get.params.id;
    const book=database.getBook(id);
    if(!book){
        res.status(404).json({message:"felhasznalo nem talalhato"})
    }
    res.status(200).json(book);
});

app.post("/api/books", (req, res) =>{                                   //SAVE BOOK
    const {title, author}=req.body;
    if(!title || !author){
        res.status(400).json("hianyzo adatok");
    }
    try{
    const saved=database.saveBook(title, author);
    const book=database.getBook(saved.LastInsertRowid);
    res.status(201).json(book);}
    catch(error){
        res.status(400).json(error.message);
    }
});

app.post("/api/books/:id/reviews", (req, res) =>{                       //REVIEWS
    const {title, author}=req.body;
    if(!title || !author){
        res.status(400).json("hianyzo adatok");
    }
    try{
    const saved=database.saveBook(title, author);
    const book=database.getBook(saved.LastInsertRowid);
    res.status(201).json(book);}
    catch(error){
        res.status(400).json(error.message);
    }
});