async function loadQuiz() {
  const params = new URLSearchParams(window.location.search);
  const quizId = params.get("quiz_id");
  const quizContainer = document.querySelector(".quiz-container");
  const quizContent = document.getElementById("quiz-content");

  if (!quizId) {
    quizContainer.innerHTML = "<p>Quiz ID not specified.</p>";
    return;
  }

  try {
    const response = await fetch(`http://localhost:8000/api/quiz/${quizId}`);
    const result = await response.json();

    if (!result.data || !Array.isArray(result.data.quiz.questions)) {
      quizContainer.innerHTML = "<p>Quiz not found or is invalid.</p>";
      return;
    }

    const quiz = result.data.quiz;

    document.getElementById("quiz-title").textContent = quiz.title;
    document.getElementById("quiz-description").textContent =
      `This quiz has ${quiz.questions.length} questions.`;

    quiz.questions.forEach((q, i) => {
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("question-block");

      questionBlock.innerHTML = `
        <p>${i + 1}. ${q.text}</p>
        ${q.options
          .map(
            (opt) => `
            <label>
              <input type="radio" name="q${i}" value="${opt.text}" required />
              ${opt.text}
            </label>`
          )
          .join("")}
      `;

      quizContent.appendChild(questionBlock);
    });

    document.getElementById("submit-quiz").addEventListener("click", () => {
      let score = 0;

      quiz.questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const correctOption = q.options.find(opt => opt.is_correct);
        if (selected && selected.value === correctOption.text) {
          score++;
        }
      });

      const scoreElement = document.getElementById("quiz-score");
      scoreElement.textContent = `Your score: ${score}/${quiz.questions.length}`;
      scoreElement.classList.remove("hidden");
    });

  } catch (error) {
    console.error("Failed to load quiz:", error);
    quizContainer.innerHTML = "<p>Failed to load quiz data.</p>";
  }
}

window.onload = loadQuiz;
