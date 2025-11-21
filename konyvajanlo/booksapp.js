import express from "express";
import * as database from "./database.bookdatabase.js";
import Database from "better-sqlite3";

import cors from "cors";

const PORT = 3001;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`a konyv szerver a ${PORT} porton fut.`);
});

app.get("/api/books", (req, res) => {
  const books = database.getBooks();
  res.status(200).json(books);
});

                                                                                //GET
app.get("/api/books/:id", (req, res) => {
  const id = req.params.id;
  const book = database.getBook(id);

  if (!book) {
    return res.status(404).json({ message: "konyv nem talalhato" });
  }

  res.status(200).json(book);
});

                                                                                //POST
app.post("/api/books", (req, res) => {
  const { title, author, description, added_by } = req.body;

  if (!title || !author || !description || !added_by) {
    return res.status(400).json("hianyzo adatok");
  }

  try {
    const saved = database.saveBook(title, author, description, added_by);
    const book = database.getBook(saved.lastInsertRowid);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

                                                                                //UPDATE
app.put("/api/books/:id", (req, res) => {
  const id = req.params.id;
  const { title, author, description, added_by } = req.body;

  if (!title || !author || !description || !added_by) {
    return res.status(400).json("hianyzo adatok");
  }

  try {
    database.updateBook(id, title, author, description, added_by);
    const updated = database.getBook(id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

                                                                                //DELETE
app.delete("/api/books/:id", (req, res) => {
  const id = req.params.id;

  try {
    database.deleteBook(id);
    res.status(200).json({ message: "konyv torolve" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
