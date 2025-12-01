const API_BOOKS = "http://localhost:3001/api/books";
const API_REVIEWS = "http://localhost:3002/api/reviews";
const API_USERS = "http://localhost:3000/api/users";

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function requireLogin() {
  if (!getUser()) {
    alert("Jelentkezz be a folytatáshoz.");
    window.location.href = "login.html";
  }
}

export async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  return res.json();
}
