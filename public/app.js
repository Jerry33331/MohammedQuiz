// State
const state = {
  user: null,
  quizzes: [],
  currentQuiz: null,
  currentQuestions: [],
  answers: {},
  isRegisterMode: false
};

// DOM helpers
const byId = (id) => document.getElementById(id);
const hide = (el) => el.classList.add("hidden");
const show = (el) => el.classList.remove("hidden");

// Sections
const authModal = () => byId("auth-modal");
const quizSelect = () => byId("quiz-select");
const quizSection = () => byId("quiz");
const historySection = () => byId("history");
const authSection = () => byId("auth-section");
const userInfo = () => byId("user-info");

// Auth elements
const authTitle = () => byId("auth-title");
const authError = () => byId("auth-error");
const authUsername = () => byId("auth-username");
const authPassword = () => byId("auth-password");
const authForm = () => byId("auth-form");
const authToggleText = () => byId("auth-toggle-text");
const authToggleLink = () => byId("auth-toggle-link");
const modalClose = () => byId("modal-close");

// Quiz elements
const quizList = () => byId("quiz-list");
const quizForm = () => byId("quiz-form");
const quizResult = () => byId("quiz-result");

// History elements
const historyList = () => byId("history-list");

// Buttons
const btnLogin = () => byId("btn-login");
const btnRegister = () => byId("btn-register");
const btnLogout = () => byId("btn-logout");
const btnHistory = () => byId("btn-history");
const btnBackToSelect = () => byId("btn-back-to-select");
const btnBackToQuizzes = () => byId("btn-back-to-quizzes");

// Initialize
async function init() {
  await checkAuth();
  setupEventListeners();
  await loadQuizzes();
  updateUI();
}

// Check authentication
async function checkAuth() {
  try {
    const response = await fetch("/api/me");
    if (response.ok) {
      state.user = await response.json();
    } else {
      state.user = null;
    }
  } catch (error) {
    state.user = null;
  }
}

// Load quizzes
async function loadQuizzes() {
  try {
    const response = await fetch("/api/quizzes");
    if (response.ok) {
      state.quizzes = await response.json();
      renderQuizList();
    }
  } catch (error) {
    console.error("Failed to load quizzes:", error);
  }
}

// Render quiz list
function renderQuizList() {
  const list = quizList();
  list.innerHTML = state.quizzes.map(quiz => `
    <div class="quiz-card" data-id="${quiz.id}">
      <h3>${quiz.title}</h3>
      <p class="quiz-meta">${quiz.subject || 'General'} • ${quiz.description || ''}</p>
      <button class="btn-primary btn-start-quiz" data-id="${quiz.id}">Start Quiz</button>
    </div>
  `).join("");

  // Attach click handlers
  list.querySelectorAll(".btn-start-quiz").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const quizId = parseInt(e.target.dataset.id);
      startQuiz(quizId);
    });
  });
}

// Start a quiz
async function startQuiz(quizId) {
  try {
    if (!state.user) {
      showAuthModal();
      return;
    }

    const response = await fetch(`/api/quizzes/${quizId}`);
    if (!response.ok) {
      alert("Failed to load quiz");
      return;
    }

    const data = await response.json();
    state.currentQuiz = data.quiz;
    state.currentQuestions = data.questions;
    state.answers = {};

    hide(quizSelect());
    show(quizSection());
    renderQuiz();
  } catch (error) {
    console.error("Failed to start quiz:", error);
    alert("Failed to start quiz");
  }
}

// Render quiz
function renderQuiz() {
  const form = quizForm();
  form.innerHTML = "";
  byId("quiz-title").textContent = state.currentQuiz.title;
  byId("quiz-subtitle").textContent = state.currentQuiz.description || "Ten questions. One score.";

  state.currentQuestions.forEach((q, index) => {
    const card = document.createElement("article");
    card.className = "quiz-card";
    card.dataset.id = q.id;

    const header = document.createElement("h3");
    header.textContent = `${index + 1}. ${q.text}`;
    header.className = "quiz-question";

    const choices = document.createElement("div");
    choices.className = "quiz-choices";

    q.choices.forEach((choice, choiceIndex) => {
      const label = document.createElement("label");
      label.className = "quiz-choice";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${q.id}`;
      input.value = String(choiceIndex);
      input.addEventListener("change", () => {
        state.answers[q.id] = choiceIndex;
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

// Submit quiz
async function submitQuiz(event) {
  event.preventDefault();

  const answered = Object.keys(state.answers).length;
  if (answered < state.currentQuestions.length) {
    quizResult().hidden = false;
    quizResult().className = "quiz-result";
    quizResult().innerHTML = '<p class="result-line">Please answer all questions first.</p>';
    return;
  }

  try {
    const response = await fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizId: state.currentQuiz.id,
        answers: state.answers
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to submit quiz");
    }

    const data = await response.json();
    renderResult(data);
  } catch (error) {
    console.error("Failed to submit quiz:", error);
    quizResult().hidden = false;
    quizResult().className = "quiz-result";
    quizResult().innerHTML = '<p class="result-line error">Failed to submit quiz. Please try again.</p>';
  }
}

// Render result
function renderResult(data) {
  const resultBox = quizResult();
  const percent = Math.round((data.score / data.total) * 100);

  // Mark each answered card
  state.currentQuestions.forEach((q, index) => {
    const card = document.querySelector(`.quiz-card[data-id="${q.id}"]`);
    const detail = data.details.find(d => d.questionId === q.id);
    if (card && detail) {
      card.classList.add(detail.isCorrect ? "correct" : "incorrect");
      const note = document.createElement("p");
      note.className = "quiz-explanation";
      note.textContent = (detail.isCorrect ? "Correct!" : "Not quite.") + " +" + detail.pointsEarned + " pts";
      card.appendChild(note);
    }
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

// Load user history
async function loadHistory() {
  try {
    const response = await fetch("/api/attempts/mine");
    if (!response.ok) {
      throw new Error("Failed to load history");
    }
    const attempts = await response.json();
    renderHistory(attempts);
  } catch (error) {
    console.error("Failed to load history:", error);
    historyList().innerHTML = '<p>Failed to load history</p>';
  }
}

// Render history
function renderHistory(attempts) {
  const list = historyList();
  
  if (attempts.length === 0) {
    list.innerHTML = '<p class="no-results">No quiz attempts yet. Complete a quiz to see your history.</p>';
    return;
  }

  list.innerHTML = attempts.map(attempt => {
    const percent = Math.round((attempt.score / attempt.totalQuestions) * 100);
    const date = new Date(attempt.completedAt).toLocaleString();
    
    return `
      <div class="history-card">
        <div class="history-quiz">
          <strong>${attempt.quizTitle}</strong>
        </div>
        <div class="history-score">
          <span class="score-value">${attempt.score}/${attempt.totalQuestions}</span>
          <span class="score-percent">(${percent}%)</span>
        </div>
        <div class="history-date">${date}</div>
      </div>
    `;
  }).join("");
}

// Show auth modal
function showAuthModal() {
  state.isRegisterMode = false;
  authTitle().textContent = "Login";
  authToggleText().textContent = "Don't have an account? ";
  authToggleLink().textContent = "Register here";
  hide(authError());
  authUsername().value = "";
  authPassword().value = "";
  show(authModal());
}

// Toggle between login and register
function toggleAuthMode() {
  state.isRegisterMode = !state.isRegisterMode;
  if (state.isRegisterMode) {
    authTitle().textContent = "Register";
    authToggleText().textContent = "Already have an account? ";
    authToggleLink().textContent = "Login here";
  } else {
    authTitle().textContent = "Login";
    authToggleText().textContent = "Don't have an account? ";
    authToggleLink().textContent = "Register here";
  }
  hide(authError());
}

// Handle auth form submit
async function handleAuthSubmit(event) {
  event.preventDefault();
  const username = authUsername().value;
  const password = authPassword().value;

  try {
    const endpoint = state.isRegisterMode ? "/api/register" : "/api/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json();
      authError().textContent = error.error || "Authentication failed";
      show(authError());
      return;
    }

    state.user = await response.json();
    hide(authModal());
    updateUI();
    await loadQuizzes();
  } catch (error) {
    authError().textContent = "Network error. Please try again.";
    show(authError());
  }
}

// Logout
async function logout() {
  try {
    await fetch("/api/logout", { method: "POST" });
    state.user = null;
    state.currentQuiz = null;
    state.currentQuestions = [];
    state.answers = {};
    updateUI();
    hide(quizSection());
    hide(historySection());
    show(quizSelect());
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

// Update UI based on auth state
function updateUI() {
  if (state.user) {
    hide(authSection());
    show(userInfo());
    byId("username").textContent = state.user.username;
    byId("role-badge").textContent = state.user.role;
    byId("role-badge").className = `role-badge ${state.user.role}`;
  } else {
    show(authSection());
    hide(userInfo());
    hide(quizSection());
    hide(historySection());
    show(quizSelect());
  }
}

// Setup event listeners
function setupEventListeners() {
  // Auth
  btnLogin().addEventListener("click", (e) => {
    e.preventDefault();
    showAuthModal();
  });

  btnRegister().addEventListener("click", (e) => {
    e.preventDefault();
    state.isRegisterMode = true;
    showAuthModal();
    toggleAuthMode();
  });

  authToggleLink().addEventListener("click", (e) => {
    e.preventDefault();
    toggleAuthMode();
  });

  modalClose().addEventListener("click", () => hide(authModal()));

  authForm().addEventListener("submit", handleAuthSubmit);

  btnLogout().addEventListener("click", logout);
  btnHistory().addEventListener("click", () => {
    hide(quizSelect());
    hide(quizSection());
    show(historySection());
    loadHistory();
  });

  btnBackToSelect().addEventListener("click", () => {
    hide(quizSection());
    show(quizSelect());
    quizResult().hidden = true;
  });

  btnBackToQuizzes().addEventListener("click", () => {
    hide(historySection());
    show(quizSelect());
  });

  // Quiz form submit
  quizForm().addEventListener("submit", submitQuiz);

  // Close modal on outside click
  authModal().addEventListener("click", (e) => {
    if (e.target === authModal()) {
      hide(authModal());
    }
  });
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", init);
