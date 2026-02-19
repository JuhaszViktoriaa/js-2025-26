import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/images'),  // a képmappa beállítása
  filename: (req, file, cb) => cb(null, `${Date.now()}${file.originalname}`),  // a feltöltött fájl átnevezése
});
const upload = multer({ storage }); 

//Fájl feltöltése
app.post("/upload", upload.single("image"), (req, res) => {
    try {
        const { filename } = req.file;
        imgDB.saveImageFile(filename);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Server error");
    }
});

upload.single('image') //csak egy kép fájl lehet egyszerre feltölteni
const { filename } = req.file; //a form input type="file" és a feltöltött fájl nevének elérése


//Fájl törlése

app.post("/delete/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const image = imgDB.getImageById(id);
        if (!image) return res.status(404).send("Image not found");
        const filePath = getFilePath(image.filename);
        await deleteFile(filePath);
        imgDB.deleteImage(id);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Server error: " + err);
    }
});

const filePath = path.join(...imageFolder, image.filename); //A fájl elérési útjának beállítása
imageFolder //egy tömbe mely a gyökérkönytárt és a fárjok tárolásának mappáit tartalmazza
image.filename //az adatbázisban tárolt fájl neve
await unlink(filePath); //a filePath által megadott fájl törlése

//Multer beállítása
const upload = multer({ storage: multer.memoryStorage() });
//A feltöltött fájlt a memóriában tárolja


//Fájl feltöltése
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const base64Image = fileBuffer.toString("base64");
    imgDB.prepare("INSERT INTO images (image, mimetype) VALUES (?, ?)").run(
      base64Image,
      req.file.mimetype
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Server error " + err);
  }
});

//Fájl törlése
app.post("/delete/:id", (req, res) => {
  try {
    const id = +req.params.id;
    imgDB.prepare("DELETE FROM images WHERE id = ?").run(id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Server error");
  }
});