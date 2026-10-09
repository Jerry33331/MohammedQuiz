// Quiz-related database operations

const pool = require("./database");

// Get all quizzes
async function getAllQuizzes() {
  const result = await pool.query(
    "SELECT id, title, description, subject, created_by, created_at FROM quizzes ORDER BY created_at"
  );
  return result.rows;
}

// Get a single quiz by ID
async function getQuizById(id) {
  const result = await pool.query(
    "SELECT id, title, description, subject, created_by, created_at FROM quizzes WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// Get questions for a quiz
async function getQuestionsForQuiz(quizId) {
  const result = await pool.query(
    `SELECT id, quiz_id, text, choices, correct_index as "correctIndex", 
            explanation, points, created_at 
     FROM questions WHERE quiz_id = $1 ORDER BY id`,
    [quizId]
  );
  return result.rows.map(row => ({
    id: row.id,
    quizId: row.quiz_id,
    text: row.text,
    choices: row.choices,
    correctIndex: row.correctIndex,
    explanation: row.explanation,
    points: row.points,
    createdAt: row.created_at
  }));
}

// Get a single question by ID
async function getQuestionById(id) {
  const result = await pool.query(
    `SELECT id, quiz_id as "quizId", text, choices, correct_index as "correctIndex", 
            explanation, points, created_at as "createdAt" 
     FROM questions WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

// Save a quiz attempt
async function saveAttempt(userId, quizId, score, totalQuestions, details) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Insert the attempt
    const attemptResult = await client.query(
      `INSERT INTO attempts (user_id, quiz_id, score, total_questions, completed_at) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING id`,
      [userId, quizId, score, totalQuestions]
    );
    
    const attemptId = attemptResult.rows[0].id;
    
    // Insert attempt details for each question
    for (const detail of details) {
      await client.query(
        `INSERT INTO attempt_details (attempt_id, question_id, user_answer_index, is_correct, points_earned) 
         VALUES ($1, $2, $3, $4, $5)`,
        [attemptId, detail.questionId, detail.userAnswerIndex, detail.isCorrect, detail.pointsEarned]
      );
    }
    
    await client.query('COMMIT');
    return attemptId;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Get user's attempt history
async function getUserAttempts(userId) {
  const result = await pool.query(
    `SELECT a.id, a.quiz_id as "quizId", a.score, a.total_questions as "totalQuestions", 
            a.completed_at as "completedAt", 
            q.title as "quizTitle"
     FROM attempts a
     JOIN quizzes q ON a.quiz_id = q.id
     WHERE a.user_id = $1 
     ORDER BY a.completed_at DESC`,
    [userId]
  );
  return result.rows;
}

// Get attempt details
async function getAttemptDetails(attemptId) {
  const result = await pool.query(
    `SELECT id, attempt_id as "attemptId", question_id as "questionId", 
            user_answer_index as "userAnswerIndex", is_correct as "isCorrect", 
            points_earned as "pointsEarned"
     FROM attempt_details WHERE attempt_id = $1`,
    [attemptId]
  );
  return result.rows;
}

module.exports = {
  getAllQuizzes,
  getQuizById,
  getQuestionsForQuiz,
  getQuestionById,
  saveAttempt,
  getUserAttempts,
  getAttemptDetails
};
