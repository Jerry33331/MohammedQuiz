const state = { questions: [], answers: {} };

const quizSection = () => document.getElementById("quiz");

async function loadQuiz() {
  const response = await fetch("/api/quiz");
  if (!response.ok) throw new Error("Failed to load quiz");
  const data = await response.json();
  state.questions = data.questions;
  renderQuiz();
}

function renderQuiz() {
  const section = quizSection();
  const form = section.querySelector(".quiz-form");

  state.questions.forEach((q) => {
    const card = document.createElement("article");
    card.className = "quiz-card";
    card.dataset.id = q.id;

    const header = document.createElement("h3");
    header.textContent = `${q.id}. ${q.question}`;
    header.className = "quiz-question";

    const badge = document.createElement("span");
    badge.className = "quiz-category";
    badge.textContent = q.category;
    header.prepend(badge);

    const choices = document.createElement("div");
    choices.className = "quiz-choices";

    q.choices.forEach((choice, index) => {
      const label = document.createElement("label");
      label.className = "quiz-choice";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${q.id}`;
      input.value = String(index);
      input.addEventListener("change", () => {
        state.answers[q.id] = index;
      });
      const text = document.createElement("span");
      text.textContent = choice;
      label.append(input, text);
      choices.appendChild(label);
    });

    card.append(header, choices);
    form.appendChild(card);
  });
}

async function submitQuiz(event) {
  event.preventDefault();
  const resultBox = document.getElementById("quiz-result");
  resultBox.hidden = true;

  const answered = Object.keys(state.answers).length;
  if (answered < state.questions.length) {
    resultBox.hidden = false;
    resultBox.className = "quiz-result";
    resultBox.innerHTML =
      '<p class="result-line">Please answer all questions first.</p>';
    return;
  }

  const response = await fetch("/api/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: state.answers })
  });
  if (!response.ok) throw new Error("Failed to score quiz");
  const data = await response.json();
  renderResult(data);
}

function renderResult(data) {
  const resultBox = document.getElementById("quiz-result");
  const percent = Math.round((data.score / data.total) * 100);

  // Mark each answered card green/red.
  data.results.forEach((r) => {
    const card = document.querySelector(`.quiz-card[data-id="${r.id}"]`);
    card.classList.add(r.isCorrect ? "correct" : "incorrect");
    const note = document.createElement("p");
    note.className = "quiz-explanation";
    note.textContent = (r.isCorrect ? "Correct! " : "Not quite. ") + r.explanation;
    card.appendChild(note);
  });

  let message = "Good things start with a question — keep going!";
  if (percent === 100) message = "Perfect score. Curiosity paid off!";
  else if (percent >= 70) message = "Strong run — a little more and it's perfect.";
  else if (percent < 40) message = "Every wrong answer teaches something new. Try again!";

  resultBox.className = "quiz-result";
  resultBox.hidden = false;
  resultBox.innerHTML =
    '<h3 class="result-title">Your result</h3>' +
    '<div class="score-bar" role="progressbar" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100">' +
    '<div class="score-bar-fill" style="width:' + percent + '%"></div>' +
    '</div>' +
    '<p class="result-line"><strong>' + data.score + ' / ' + data.total +
    '</strong> correct (' + percent + '%) — ' + message + '</p>';
  resultBox.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuiz().catch((error) => {
    console.error(error);
    const section = quizSection();
    if (section) {
      section.innerHTML = '<p class="quiz-error">Could not load the quiz. Please refresh and try again.</p>';
    }
  });

  const form = document.querySelector(".quiz-form");
  if (form) form.addEventListener("submit", submitQuiz);
});
