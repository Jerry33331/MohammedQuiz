const bcrypt = require("bcryptjs");
const pool = require("./database");

const SALT_ROUNDS = 10;

// Hash a password using bcryptjs
async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

// Verify a password against a hash
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// Create a new user with hashed password
async function createUser(username, password, role = "player") {
  const passwordHash = await hashPassword(password);
  const result = await pool.query(
    "INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id, username, role",
    [username, passwordHash, role]
  );
  return result.rows[0];
}

// Find a user by username
async function findUserByUsername(username) {
  const result = await pool.query(
    "SELECT id, username, password_hash, role FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0];
}

// Find a user by ID
async function findUserById(id) {
  const result = await pool.query(
    "SELECT id, username, role FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// Check if username exists
async function usernameExists(username) {
  const result = await pool.query(
    "SELECT 1 FROM users WHERE username = $1",
    [username]
  );
  return result.rowCount > 0;
}

module.exports = {
  hashPassword,
  verifyPassword,
  createUser,
  findUserByUsername,
  findUserById,
  usernameExists,
};
