import db from './data/db.js';
import express from 'express';

const PORT = 3030;
const app = express();
app.use(express.json());

app.get('/students', (req, res) =>{
    const clas=req.query.class;
    const students = db.prepare(`SELECT * FROM students WHERE classes=? ORDER BY lastname`).all(clas);
    res.json(students);
})

app.listen(PORT, () =>{
    console.log(`server runs on port ${PORT}`)
})