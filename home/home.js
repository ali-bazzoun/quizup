document.addEventListener("DOMContentLoaded", async () => {
  const quizList = document.getElementById("quiz-list");
  const logoutButton = document.getElementById("logout-btn");

  try {
    const response = await fetch("http://localhost:8000/api/quiz", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.status === 'success') {
      throw new Error(`Network response was not ok (${response.status})`);
    }

    const  result = await response.json();

    if (!Array.isArray(result.data)) {
      quizList.innerHTML = "<p>No quizzes available.</p>";
      return;
    }

    result.data.forEach(quiz => {
      const card = document.createElement("div");
      card.className = "quiz-card";

      card.innerHTML = `
        <div class="card-content">
          <h3>${quiz.title}</h3>
          <p>${quiz.description}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        window.location.href = `quiz.html?id=${quiz.id ?? ''}`;
      });

      quizList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading quizzes:", error);
    quizList.innerHTML = "<p>Failed to load quizzes.</p>";
  }

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/auth/auth.html";
  });
});
