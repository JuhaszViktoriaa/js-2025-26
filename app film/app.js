import express from "express";
const PORT = 3000;
const app = express();

app.listen(port, () => {
  console.log("a szerver a ${PORT}. porton fut.");
});

app.use(express.json());

cofilms = [
  { id: 1, title: "alice in wonderland", year: 2020 },
  { id: 2, title: "2521", year: 2021 },
  { id: 3, title: "tomorrow", year: 2019 },
];

app.get("/films", (req, res) => {
  res.status(200).json(films);
});

app.get("/films/:id", (req, res) => {
  const uid = parseInt(req.params.id);
  const film = films.find((film) => film.id == uid);
  if (!film) {
    return res.status(404).json({ message: "a film nem talalhato." });
  }
  res.status(200).json(film);
});

app.post("/films", (req, res) => {
  const { title, year } = req.body;
  if (!title || !year) {
    return res.status(404).json({ message: "ervenytelen adatok." });
  }
  const id = films[films.length - 1]?.id + 1;
  const film = { id, title, year };
  films.push(film);
  res.status(201).json(film);
});

app.put("/films/:id", (req, res) => {
  const uid = Number(req.params.id);
  const film = films.find((film) => film.id == uid);
  if (!film) {
    return res.status(404).json({ message: "a film nem talalhato." });
  }
  const { title, year } = req.body;
  if (!title || !year) {
    return res.status(404).json({ message: "ervenytelen adatok." });
  }
  const index = films.indexOf(film);
  films[index] = {
    id: film.id,
    title: title,
    year: year,
  };
  res.status(200).json(films[index]);
});

app.delete("/users/:id", (req, res) => {
  const uid = +req.params.id;
  const film = films.find((film) => film.id == uid);
  if (!film) {
    return res.status(404).json({ message: "a film nem talalhato." });
  }
  const index = films.indexOf(film);
  films.splice(index, 1);
  res.status(200).json({ message: "sikeres torles." });
});

app.patch("/users/:id", (req, res) => {
  const uid = +req.params.id;
  const film = films.find((film) => film.id == uid);
  if (!film) {
    return res.status(404).json({ message: "a film nem talalhato." });
  }
  const { title, year } = req.body;
  const index = films.indexOf(film);
  films[index] = {
    id: film.id,
    title: title || film.title,
    year: year || film.year,
  };
  res.status(200).json(films[index]);
});
