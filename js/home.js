document.addEventListener("DOMContentLoaded", () => {
	const quizList = document.getElementById("quiz-list");
	const logoutButton = document.getElementById("logout-btn");
  
	fetch("data/quizzes.json")
	  .then(response => response.json())
	  .then(data => {
		data.forEach(quiz => {
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
			window.location.href = `quiz.html?id=${quiz.id}`;
		  });
		  quizList.appendChild(card);
		});
	  })
	  .catch(error => {
		console.error("Error loading quizzes:", error);
		quizList.innerHTML = "<p>Failed to load quizzes.</p>";
	  });
  
	logoutButton.addEventListener("click", () => {
	  localStorage.removeItem("currentUser");
	  window.location.href = "auth.html";
	});
  });