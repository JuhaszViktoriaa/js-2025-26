import express from 'express';
import database from "./data/db.js";

const PORT = 3030;
const app = express();
app.use(express.json());

//1?

//2
app.get('/telepules', (req, res) =>{
    const diakok = req.query.class;
    const telepules = db.prepare(`SELECT * FROM diakok WHERE nev=?`).all(diakok);
    res.json(telepules);
})

//3
app.get('/tanora', (req, res) =>{
    const orak = req.query.class;
    const tanorak = db.prepare(`SELECT * FROM orak WHERE targy="angol"`).all(orak);
    res.json(tanorak);
})

//4
app.get('/9-matematika-fizika', (req, res) =>{
    const ora = req.query.class;
    const tanora = db.prepare(`SELECT * FROM orak WHERE targy="matematika" INNER JOIN orak Where targy="fizika", GROUP BY csoport, ASC, LIMIT 1`).all(ora);
    res.json(tanora);
})

//5
app.get('/telepulesfo', (req, res) =>{
    const diak = req.query.class;
    const telepulesek = db.prepare(`COUNT AS telepulesfo (SELECT * FROM diakok WHERE telepules=?, GROUP BY telepules, DESC)`).all(diak);
    res.json(telepulesek);
})

//6
app.get('/tantargyak', (req, res) =>{
    const diak = req.query.class;
    const latogathato_targyak = db.prepare(`COUNT AS latogathato_tantargyak (SELECT * FROM orawk WHERE targy=? ASC, DISTINCT)`).all(diak);
    res.json(latogathato_targyak);
})

//7
app.get('/tanar', (req, res) =>{
    const t_orak = req.query.class;
    const adatok = db.prepare(`SELECT * FROM orak RIGHT JOIN kapcsolo WHERE orak(id) = kapcsolo(id) (GROUP BY tanar=?, datum=? WHERE kapcsolo(diakid) = diakok(id)) HAVING diak(nev), diak(email), diak(email)`).all(t_orak);
    res.json(adatok);
})

//8?
app.get('/telepulesrol', (req, res) =>{
    const nevek = req.query.class;
    const diakoknevei = db.prepare(`SELECT * FROM diakok WHERE telepules=? GROUP BY telepules`).all(nevek);
    res.json(diakoknevei);
})

//9
app.get('/szabad', (req, res) =>{
    const szabadorak = req.query.class;
    const szabadtanorak = db.prepare(`SELECT * AS szabad WHERE (SELECT * FROM orak WHERE ferohely > 0 ORDER BY DESC) datum, orasorszam, targy, tanar, szabad))`).all(szabadorak);
    res.json(szabadtanorak);
})

app.listen(PORT, () => {
    console.log(`a szerver a ${PORT} porton fut.`)
})