const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let questions = [];

// Fetch questions from API
async function fetchQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple");
  const data = await res.json();
  questions = data.results.map(q => {
    const answers = [...q.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * (answers.length + 1));
    answers.splice(randomIndex, 0, q.correct_answer);
    return {
      question: q.question,
      answers: answers,
      correct: q.correct_answer
    };
  });
  showQuestion();
}

function showQuestion() {
  resetState();
  let q = questions[currentQuestion];
  questionEl.innerHTML = q.question;

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.innerHTML = answer;
    btn.addEventListener("click", () => selectAnswer(btn, q.correct));
    optionsEl.appendChild(btn);
  });
}

function resetState() {
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
}

function selectAnswer(selectedBtn, correctAnswer) {
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach(btn => {
    btn.disabled = true;
    if (btn.innerHTML === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn) {
      btn.classList.add("wrong");
    }
  });

  if (selectedBtn.innerHTML === correctAnswer) {
    score++;
    scoreEl.textContent = `Score: ${score}`;
  }
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    questionEl.innerHTML = "🎉 Quiz Finished!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
  }
});

// Load first questions
fetchQuestions();
