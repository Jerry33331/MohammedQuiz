const express = require("express");
const path = require("node:path");
const pool = require("./src/database");
const { sessionMiddleware, registerUser, loginUser, requireAuth } = require("./src/auth");
const { getAllQuizzes, getQuizById, getQuestionsForQuiz, saveAttempt, getUserAttempts } = require("./src/quizzes");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(sessionMiddleware);

app.get("/api/health", async (_request, response) => {
  try {
    const result = await pool.query("SELECT $1::text AS status", ["ok"]);
    response.json({ status: result.rows[0].status, database: "connected" });
  } catch (error) {
    console.error("Database health check failed:", error.message);
    response.status(503).json({ status: "unavailable", database: "disconnected" });
  }
});

// Authentication endpoints
app.post("/api/register", async (request, response) => {
  try {
    const { username, password } = request.body;
    if (!username || !password) {
      return response.status(400).json({ error: "Username and password are required" });
    }
    
    const user = await registerUser(username, password);
    request.session.userId = user.id;
    request.session.username = user.username;
    request.session.role = user.role;
    
    response.json({ 
      id: user.id, 
      username: user.username, 
      role: user.role 
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    if (error.message.includes("duplicate key")) {
      return response.status(400).json({ error: "Username already exists" });
    }
    response.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/login", async (request, response) => {
  try {
    const { username, password } = request.body;
    if (!username || !password) {
      return response.status(400).json({ error: "Username and password are required" });
    }
    
    const user = await loginUser(username, password);
    if (!user) {
      return response.status(401).json({ error: "Invalid username or password" });
    }
    
    request.session.userId = user.id;
    request.session.username = user.username;
    request.session.role = user.role;
    
    response.json(user);
  } catch (error) {
    console.error("Login error:", error.message);
    response.status(500).json({ error: "Login failed" });
  }
});

app.post("/api/logout", (request, response) => {
  request.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error.message);
      return response.status(500).json({ error: "Logout failed" });
    }
    response.clearCookie("connect.sid");
    response.json({ message: "Logged out successfully" });
  });
});

app.get("/api/me", (request, response) => {
  if (request.session.userId) {
    response.json({
      id: request.session.userId,
      username: request.session.username,
      role: request.session.role
    });
  } else {
    response.status(401).json({ error: "Not authenticated" });
  }
});

// Quiz endpoints
app.get("/api/quizzes", async (request, response) => {
  try {
    const quizzes = await getAllQuizzes();
    response.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error.message);
    response.status(500).json({ error: "Failed to load quizzes" });
  }
});

app.get("/api/quizzes/:id", async (request, response) => {
  try {
    const quizId = parseInt(request.params.id);
    const quiz = await getQuizById(quizId);
    
    if (!quiz) {
      return response.status(404).json({ error: "Quiz not found" });
    }
    
    const questions = await getQuestionsForQuiz(quizId);
    
    response.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        subject: quiz.subject
      },
      questions: questions.map(q => ({
        id: q.id,
        text: q.text,
        choices: q.choices
      }))
    });
  } catch (error) {
    console.error("Error fetching quiz:", error.message);
    response.status(500).json({ error: "Failed to load quiz" });
  }
});

// Submit quiz attempt (requires authentication)
app.post("/api/attempts", requireAuth, async (request, response) => {
  try {
    const { quizId, answers } = request.body;
    
    if (!quizId || !answers) {
      return response.status(400).json({ error: "quizId and answers are required" });
    }
    
    // Get the quiz questions
    const questions = await getQuestionsForQuiz(quizId);
    
    if (questions.length === 0) {
      return response.status(404).json({ error: "Quiz not found or has no questions" });
    }
    
    // Check if all questions are answered
    if (Object.keys(answers).length !== questions.length) {
      return response.status(400).json({ 
        error: "All questions must be answered",
        missing: questions.filter(q => answers[q.id] === undefined).map(q => q.id)
      });
    }
    
    // Calculate score and prepare details
    let score = 0;
    const details = [];
    
    for (const question of questions) {
      const userAnswerIndex = answers[question.id];
      const isCorrect = userAnswerIndex === question.correctIndex;
      const pointsEarned = isCorrect ? question.points : 0;
      
      if (isCorrect) {
        score += pointsEarned;
      }
      
      details.push({
        questionId: question.id,
        userAnswerIndex: userAnswerIndex,
        isCorrect: isCorrect,
        pointsEarned: pointsEarned
      });
    }
    
    // Save the attempt
    const attemptId = await saveAttempt(
      request.session.userId,
      quizId,
      score,
      questions.length,
      details
    );
    
    response.json({
      attemptId,
      quizId,
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      details: details.map(d => ({
        questionId: d.questionId,
        userAnswerIndex: d.userAnswerIndex,
        isCorrect: d.isCorrect,
        pointsEarned: d.pointsEarned
      }))
    });
  } catch (error) {
    console.error("Error saving attempt:", error.message);
    response.status(500).json({ error: "Failed to save attempt" });
  }
});

// Get user's attempt history (requires authentication)
app.get("/api/attempts/mine", requireAuth, async (request, response) => {
  try {
    const attempts = await getUserAttempts(request.session.userId);
    response.json(attempts);
  } catch (error) {
    console.error("Error fetching attempts:", error.message);
    response.status(500).json({ error: "Failed to load attempt history" });
  }
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
