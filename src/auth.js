const bcrypt = require("bcryptjs");
const pool = require("./database");

// Session configuration
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);

const sessionMiddleware = session({
  store: new PgSession({
    pool: pool,
    tableName: "user_sessions"
  }),
  secret: process.env.SESSION_SECRET || "mohammed-quiz-secret-key-change-me",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
});

// Register a new user
async function registerUser(username, password, role = 'player') {
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id, username, role",
    [username, passwordHash, role]
  );
  return result.rows[0];
}

// Login user
async function loginUser(username, password) {
  const result = await pool.query(
    "SELECT id, username, password_hash, role FROM users WHERE username = $1",
    [username]
  );
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const user = result.rows[0];
  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  
  if (!passwordMatch) {
    return null;
  }
  
  return {
    id: user.id,
    username: user.username,
    role: user.role
  };
}

// Get user by ID
async function getUserById(id) {
  const result = await pool.query(
    "SELECT id, username, role FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// Middleware to check authentication
function requireAuth(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized - Please login" });
}

// Middleware to check teacher role
function requireTeacher(req, res, next) {
  if (req.session.userId && (req.session.role === 'teacher' || req.session.role === 'admin')) {
    return next();
  }
  res.status(403).json({ error: "Forbidden - Teacher access required" });
}

// Middleware to check admin role
function requireAdmin(req, res, next) {
  if (req.session.userId && req.session.role === 'admin') {
    return next();
  }
  res.status(403).json({ error: "Forbidden - Admin access required" });
}

module.exports = {
  sessionMiddleware,
  registerUser,
  loginUser,
  getUserById,
  requireAuth,
  requireTeacher,
  requireAdmin
};
