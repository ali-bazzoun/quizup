async function loadQuiz() {
  const params = new URLSearchParams(window.location.search);
  const quizId = parseInt(params.get("id"));

  const res = await fetch("data/quizzes.json");
  const quizzes = await res.json();
  const quiz = quizzes.find(q => q.id === quizId);

  if (!quiz) {
    document.querySelector(".quiz-container").innerHTML = "<p>Quiz not found.</p>";
    return;
  }

  document.getElementById("quiz-title").textContent = quiz.title;
  document.getElementById("quiz-description").textContent = `This quiz has ${quiz.questions.length} questions.`;

  const quizContent = document.getElementById("quiz-content");
  quiz.questions.forEach((q, i) => {
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");

    questionBlock.innerHTML = `
      <p>${i + 1}. ${q.question}</p>
      ${q.options
        .map(
          option => `
        <label>
          <input type="radio" name="q${i}" value="${option}" required>
          ${option}
        </label>`
        )
        .join("")}
    `;

    quizContent.appendChild(questionBlock);
  });

  document.getElementById("submit-quiz").addEventListener("click", function () {
    let score = 0;

    quiz.questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });

    if (window.currentUser) {
      window.currentUser.updateScore(score);

      const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
      const userIndex = usersList.findIndex(user => user.email === window.currentUser.email);
      if (userIndex !== -1) {
        usersList[userIndex].scores = window.currentUser.scores;
        localStorage.setItem("usersList", JSON.stringify(usersList));
      }

      localStorage.setItem("currentUser", JSON.stringify(window.currentUser));

      console.log(`Scores for ${window.currentUser.email}:`, window.currentUser.scores);
    } else {
      console.warn("No user is logged in.");
    }

    const scoreElement = document.getElementById("quiz-score");
    scoreElement.textContent = `Your score: ${score}/${quiz.questions.length}`;
    scoreElement.classList.remove("hidden");
  });
}

window.onload = loadQuiz;
