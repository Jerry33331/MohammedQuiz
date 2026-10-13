const express = require("express");
const path = require("node:path");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const pool = require("./src/database");
const {
  createUser,
  findUserByUsername,
  findUserById,
  verifyPassword,
} = require("./src/auth");

const app = express();
const port = Number(process.env.PORT) || 5000;

// Session configuration
app.use(
  session({
    store: new PgSession({
      pool: pool,
      tableName: "user_sessions",
    }),
    secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Middleware to check if user is authenticated
function requireAuth(request, response, next) {
  if (request.session.userId) {
    return next();
  }
  response.status(401).json({ error: "Unauthorized: Please log in" });
}

// Middleware to check if user is admin or teacher
function requireAdmin(request, response, next) {
  if (request.session.userRole === "admin" || request.session.userRole === "teacher") {
    return next();
  }
  response.status(403).json({ error: "Forbidden: Admin or Teacher access required" });
}

app.get("/api/health", async (_request, response) => {
  try {
    const result = await pool.query("SELECT $1::text AS status", ["ok"]);
    response.json({ status: result.rows[0].status, database: "connected" });
  } catch (error) {
    console.error("Database health check failed:", error.message);
    response.status(503).json({ status: "unavailable", database: "disconnected" });
  }
});

// GET /api/me - Get current user info
app.get("/api/me", requireAuth, async (request, response) => {
  try {
    const user = await findUserById(request.session.userId);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    response.json({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    response.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/register - Register a new user
app.post("/api/register", async (request, response) => {
  try {
    const { username, password } = request.body;
    if (!username || !password) {
      return response
        .status(400)
        .json({ error: "Username and password are required" });
    }
    if (username.length < 3) {
      return response
        .status(400)
        .json({ error: "Username must be at least 3 characters" });
    }
    if (password.length < 6) {
      return response
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return response.status(400).json({ error: "Username already exists" });
    }
    const user = await createUser(username, password, "player");
    response.status(201).json({
      id: user.id,
      username: user.username,
      role: user.role,
      message: "Registration successful. Please log in.",
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    response.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/login - Log in a user
app.post("/api/login", async (request, response) => {
  try {
    const { username, password } = request.body;
    if (!username || !password) {
      return response
        .status(400)
        .json({ error: "Username and password are required" });
    }
    const user = await findUserByUsername(username);
    if (!user) {
      return response.status(401).json({ error: "Invalid username or password" });
    }
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return response.status(401).json({ error: "Invalid username or password" });
    }
    request.session.userId = user.id;
    request.session.userRole = user.role;
    request.session.save(() => {
      response.json({
        id: user.id,
        username: user.username,
        role: user.role,
        message: "Login successful",
      });
    });
  } catch (error) {
    console.error("Login error:", error.message);
    response.status(500).json({ error: "Login failed" });
  }
});

// POST /api/logout - Log out a user
app.post("/api/logout", requireAuth, (request, response) => {
  request.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error.message);
      return response.status(500).json({ error: "Logout failed" });
    }
    response.clearCookie("connect.sid");
    response.json({ message: "Logged out successfully" });
  });
});

// Public quiz data: questions + choices, without the correct answers.
app.get("/api/quiz", (_request, response) => {
  response.json({
    total: QUESTIONS.length,
    questions: QUESTIONS.map((q) => ({
      id: q.id,
      category: q.category,
      question: q.question,
      choices: q.choices
    }))
  });
});

// Grade submitted answers and return per-question results.
app.post("/api/score", (request, response) => {
  const answers = request.body && request.body.answers;
  if (!answers || typeof answers !== "object") {
    return response.status(400).json({ error: "Missing 'answers' object in request body." });
  }

  const results = QUESTIONS.map((q) => {
    const given = answers[String(q.id)];
    const givenIndex = Number.isInteger(given) ? given : null;
    return {
      id: q.id,
      question: q.question,
      givenIndex,
      correctIndex: q.answerIndex,
      isCorrect: givenIndex === q.answerIndex,
      explanation: q.explanation
    };
  });

  const score = results.filter((r) => r.isCorrect).length;
  response.json({ score, total: QUESTIONS.length, results });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Mohammed Quiz is listening on port ${port}`);
});

function closeServer() {
  pool.end().finally(() => process.exit(0));
}

process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);

module.exports = app;
