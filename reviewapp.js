import express from "express";
import * as database from "./database.reviewdatabase.js";
import Database from "better-sqlite3";

import cors from "cors";

const PORT = 3002;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`a review szerver a ${PORT} porton fut.`);
});

                                                                            //GET
app.get("/api/reviews", (req, res) => {
  const reviews = database.getReviews();
  res.status(200).json(reviews);
});

                                                                            //GET
app.get("/api/reviews/:id", (req, res) => {           
  const id = req.params.id;
  const review = database.getReview(id);

  if (!review) {
    return res.status(404).json({ message: "review nem talalhato" });
  }

  res.status(200).json(review);
});

                                                                        //CREATE
app.post("/api/reviews", (req, res) => {
  const { book_id, user_id, rating, comment } = req.body;

  if (!book_id || !user_id || !rating || comment == null) {
    return res.status(400).json("hianyzo adatok");
  }

  try {
    const saved = database.saveReview(book_id, user_id, rating, comment);
    const review = database.getReview(saved.lastInsertRowid);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

                                                                        //UPDATE
app.put("/api/reviews/:id", (req, res) => {
  const id = req.params.id;
  const { book_id, user_id, rating, comment } = req.body;

  if (!book_id || !user_id || !rating || comment == null) {
    return res.status(400).json("hianyzo adatok");
  }

  try {
    database.updateReview(id, book_id, user_id, rating, comment);
    const updated = database.getReview(id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


app.delete("/api/reviews/:id", (req, res) => {                          //DELETE
  const id = req.params.id;

  try {
    database.deleteReview(id);
    res.status(200).json({ message: "review torolve" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
