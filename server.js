const express = require("express");
const path = require("node:path");
const pool = require("./src/database");
const QUESTIONS = require("./src/questions");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/api/health", async (_request, response) => {
  try {
    const result = await pool.query("SELECT $1::text AS status", ["ok"]);
    response.json({ status: result.rows[0].status, database: "connected" });
  } catch (error) {
    console.error("Database health check failed:", error.message);
    response.status(503).json({ status: "unavailable", database: "disconnected" });
  }
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
