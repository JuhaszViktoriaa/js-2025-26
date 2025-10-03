import express from "express";
import cors from "cors";
import sqlite3 from "better-sqlite3";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const info = stmt.run(email, hashedPassword);
    res
      .status(201)
      .json({ message: "User registered", userId: info.lastInsertRowid });
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      res.status(409).json({ message: "Email already exists." });
    } else {
      res.status(500).json({ message: "Database error." });
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.json({ message: "Login successful", userId: user.id });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function login() {
  const email = document.getElementById("login-email").value;
  const jelszo = document.getElementById("login-jelszo").value;
  const errorDiv = document.getElementById("login-error");

  if (!validateEmail(email)) {
    errorDiv.textContent = "hibas email!";
    return;
  }

  if (jelszo.length < 8) {
    errorDiv.textContent = "a jelszo nem eleg hosszu!";
    return;
  }

  errorDiv.textContent = "";

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: jelszo }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("bejelentkezes sikeres!");
    } else {
      errorDiv.textContent = data.message || "Hibás bejelentkezés.";
    }
  } catch (err) {
    errorDiv.textContent = "Hálózati hiba.";
  }
}
