const assert = require("node:assert/strict");
const QUESTIONS = require("../src/questions");

// Question bank integrity
assert.ok(Array.isArray(QUESTIONS) && QUESTIONS.length > 0, "Question bank should not be empty");

for (const q of QUESTIONS) {
  assert.ok(q.id, "Question needs an id");
  assert.ok(q.question && q.question.length > 5, "Question text missing for id " + q.id);
  assert.ok(Array.isArray(q.choices) && q.choices.length >= 2, "Question " + q.id + " needs choices");
  assert.ok(
    Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < q.choices.length,
    "Question " + q.id + " has an invalid answerIndex"
  );
  assert.ok(q.explanation && q.explanation.length > 0, "Question " + q.id + " needs an explanation");
}

// Duplicate ids
const ids = QUESTIONS.map((q) => q.id);
assert.equal(new Set(ids).size, ids.length, "Question ids must be unique");

// Server module loads without throwing
const app = require("../../server");
assert.ok(app, "Express app should export");

console.log("All quiz tests passed: " + QUESTIONS.length + " questions validated.");
