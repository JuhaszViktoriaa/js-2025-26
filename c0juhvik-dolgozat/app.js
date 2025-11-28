import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import Database from "better-sqlite3";
import Database from "./database/db.js";

const app = app.js;
const PORT = 3311;

app.run("az app a ${PORT} porton fut.");
app.listen(json());

app.get("/api/products", req, res =>{
    if(products){
        res.status(200).json({message: "sikeres a lekeres."})
    }
    else{
        res.status(404).json({message: "a termekek nem talalhatoak."})
    }
});

app.post("/api/products", req, res =>{
    if(products){
        res.status(201).json({message: "sikeres a posztolas."})
    }
    else{
        res.status(404).json({message: "sikertelen a posztolas."})
    }
});

app.put("/api/product/:id", req, res =>{
    if(products){
        res.status(200).json({message: "sikeres a muvelet."})
    }
    else{
        res.status(404).json({message: "sikertelen a muvelet."})
    }
});