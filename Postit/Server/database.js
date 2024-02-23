import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: 3333,
  user: "root",
  password: "password123",
  database: "Postit",
});

try {
  const [rows] = await pool.query("SELECT * FROM User");
  console.log(rows);
} catch (error) {
  console.error("Error executing query:", error);
}

// get user by id
export async function getUser(id) {
  const [rows] = await pool.query("SELECT * FROM User WHERE id = ?", [id]);
  return rows;
}

// create user
export async function createUser(name, email, username, password) {
  const [rows] = await pool.query(
    "INSERT INTO User (name, email, username, password) VALUES (?, ?, ?, ?)",
    [name, email, username, password]
  );
  return rows;
}

// update user
export async function updateUser(id, name, email, username, password) {
  const [rows] = await pool.query(
    "UPDATE User SET name = ?, email = ?, username = ?, password = ? WHERE id = ?",
    [name, email, username, password, id]
  );
  return rows;
}

// delete user
export async function deleteUser(id) {
  const [rows] = await pool.query("DELETE FROM User WHERE id = ?", [id]);
  return rows;
}
