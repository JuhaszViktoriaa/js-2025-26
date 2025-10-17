import express from "express";
import * as User from "../database/user.js";
const router = express.Router();
import bcrypt, { hash } from "bcrypt";
import jwt from "jwt";

router.get("/", (req, res) => {
  const users = User.getUsers();
  res.json(users);
});
/////////////////////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
  const getUsers = user;
  return res.status(200).json;
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
});

router.put("/:id", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
});

router.delete("/", (req, res) => {
  database.deleteUser(+req.params.id);
  res.status(200).json({ message: "Delete successful." });
});
///////////////////////////2025-10-16////////////////////////////////

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "hianyos adatok!" });
  }
  const user = users.getuserbyemail(email);
  if(user){
    return res.status(400).json({message: "ez a fiok ezzel az emailcimmel mar letezik"});
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const saved = users.saveUser(name, email, hashedPassword);
  user = users.getuserby(saved.lastInsertRowId);
  delete user.password;
  res.status(201).json(user);
});

router.post("/login", (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
      return res.status(400).json({ message: "hianyos adatok!" });
  }
  const user = users.getuserbyemail(email);
  if(user){
    return res.status(400).json({message: "hianyos adatok!"});
  }
  if(!bcrypt.compareSync(password, user.password)){
      return res.status(404).json({message: "nincs ilyen felhasznalo!"});
  }
  const token = jwt.sign({userid: user.id}, "secret_key", {expiresIn: "30m"})
  res.json({token});
})

router.get("/me", authentication, (req, res) => {
  const user = users.getuserbyid(req.userId);
  delete user.password;
  res.json(user);
})

function authentication(req, res, next){
  const accessToken = req.headers.authentication;
  if(!accessToken){
    return res.status(401).json({message: "unauthorised"});
  }
  const token = jwt.verify(accessToken.split(' ')[1], "secret_key");
  const now = Math.floor(date.now()/1000);
  if(!token || !token.exp || token.exp < now){
    return res.status(403).json({message: "token lejart."});
  }
  //req.userid = dataid;
  req.userid = token.userId;
  next();
}

router.patch("/:id", authentication, (req, res) => {
  const id =+req.params.id;
  if(id!=+req.userId){
    return res.status(400).json({message: "invalid felhasznalo"});
  }
  let user=users.getuserbyid(id);
  if(!user){
    return res.status(404).json({message: "nincs ilyen felhasznalo"});
  }

  const {name, email, password} = req.body;
  let hashedPassword;
  if(password){
    const salt=bcrypt.genSaltSync();
    hashedPassword=bcrypt.hashSync(password, salt);
  }
})

router.patch("/:id", authentication, (req, res) => {
  const id =+req.params.id;
  if(id!=+req.userId){
    return res.status(400).json({message: "invalid felhasznalo"});
  }
  let user=users.getuserbyid(id);
  if(!user){
    return res.status(404).json({message: "nincs ilyen felhasznalo"});
  }

  const {name, email, password} = req.body;
  let hashedPassword;
  if(password){
    const salt=bcrypt.genSaltSync();
    hashedPassword=bcrypt.hashSync(password, salt);
  }
})
router.patch("/:id", authentication, (req, res) => {
  const id =+req.params.id;
  if(id!=+req.userId){
    return res.status(400).json({message: "invalid felhasznalo"});
  }
  let user=users.getuserbyid(id);
  if(!user){
    return res.status(404).json({message: "nincs ilyen felhasznalo"});
  }

  const {name, email, password} = req.body;
  let hashedPassword;
  if(password){
    const salt=bcrypt.genSaltSync();
    hashedPassword=bcrypt.hashSync(password, salt);
  }
});

router.delete("/:id", authentication, (req, res) => {
  const id =+req.params.id;
  if(id!=+req.userId){
    return res.status(400).json({message: "invalid felhasznalo"});
  }
  delete req.userId;
  delete req.headers.params;
})

export default router;