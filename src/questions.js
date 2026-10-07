// Central question bank for Mohammed Quiz.
// Each question: { id, category, question, choices[4], answerIndex, explanation }

const QUESTIONS = [
  {
    id: 1,
    category: "Science",
    question: "What planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Mercury"],
    answerIndex: 1,
    explanation: "Mars looks red because of iron oxide (rust) on its surface."
  },
  {
    id: 2,
    category: "Geography",
    question: "What is the longest river in the world?",
    choices: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    answerIndex: 1,
    explanation: "The Nile is traditionally considered the longest river (~6,650 km), though some measurements favor the Amazon."
  },
  {
    id: 3,
    category: "Science",
    question: "What is the chemical symbol for gold?",
    choices: ["Go", "Gd", "Au", "Ag"],
    answerIndex: 2,
    explanation: "Au comes from the Latin word 'aurum', meaning gold."
  },
  {
    id: 4,
    category: "History",
    question: "Who was the first person to walk on the Moon?",
    choices: ["Buzz Aldrin", "Yuri Gagarin", "John Glenn", "Neil Armstrong"],
    answerIndex: 3,
    explanation: "Neil Armstrong stepped onto the Moon on July 20, 1969, during Apollo 11."
  },
  {
    id: 5,
    category: "Math",
    question: "What is the only even prime number?",
    choices: ["0", "1", "2", "4"],
    answerIndex: 2,
    explanation: "Every other even number is divisible by 2, so 2 is the only even prime."
  },
  {
    id: 6,
    category: "Technology",
    question: "What does 'HTTP' stand for?",
    choices: [
      "HyperText Transfer Protocol",
      "High Transfer Text Protocol",
      "HyperTool Transfer Path",
      "Hyperlink Text Type Protocol"
    ],
    answerIndex: 0,
    explanation: "HTTP is the protocol browsers use to communicate with web servers."
  },
  {
    id: 7,
    category: "Nature",
    question: "How many hearts does an octopus have?",
    choices: ["1", "2", "3", "8"],
    answerIndex: 2,
    explanation: "Two hearts pump blood to the gills; one pumps it to the rest of the body."
  },
  {
    id: 8,
    category: "Geography",
    question: "Which country has the most time zones?",
    choices: ["Russia", "USA", "China", "France"],
    answerIndex: 3,
    explanation: "With its overseas territories, France spans 12 time zones — more than any other country."
  },
  {
    id: 9,
    category: "Science",
    question: "What gas do plants absorb from the atmosphere for photosynthesis?",
    choices: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answerIndex: 2,
    explanation: "Plants take in CO2 and release oxygen during photosynthesis."
  },
  {
    id: 10,
    category: "History",
    question: "The Great Pyramid of Giza was built as a tomb for which pharaoh?",
    choices: ["Khufu", "Tutankhamun", "Ramses II", "Cleopatra"],
    answerIndex: 0,
    explanation: "The Great Pyramid was built around 2560 BC for Pharaoh Khufu."
  }
];

module.exports = QUESTIONS;
