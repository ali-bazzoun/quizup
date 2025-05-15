document.addEventListener("DOMContentLoaded", () => {
  fetchQuizzes();
  
  const logoutButton = document.getElementById("logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "/auth/auth.html";
    });
  }
  
});

async function fetchQuizzes() {
  const quizList = document.getElementById("quiz-list");
  try {
    const response = await fetch('http://localhost:8000/api/quiz', {method: 'GET'});
    if (!response.status === 'success') {
      quizList.innerHTML = "<p>No quizzes available.</p>";
      throw new Error('Failed to fetch quizzes');
    }
    const result = await response.json();
    if (!Array.isArray(result.data.quizzes)) {
      quizList.innerHTML = "<p>No quizzes available.</p>";
      return;
    }
    quizzes = result.data.quizzes;
    quizzes.forEach(quiz => {
      const card = document.createElement("div");
      card.className = "quiz-card";
      card.innerHTML = `
        <img src="${quiz.image}" alt="${quiz.title}" />
        <div class="card-content">
          <h3>${quiz.title}</h3>
          <p>${quiz.description}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        window.location.href = `/quiz/quiz.html?quiz_id=${quiz.id}`;
      });
      quizList.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    quizList.innerHTML = "<p>error : No quizzes available.</p>";
  }
}
