class User {
	constructor(data) {
		this.email = data.email;
		this.password = data.password;
		this.scores = Array.isArray(data.scores) ? data.scores : [];
	}

	updateScore(newScore) {
		this.scores.push(newScore);
	}
}
  
  function getCurrentUser() {
	return JSON.parse(localStorage.getItem("currentUser"));
  }
  
  function setCurrentUser(user) {
	localStorage.setItem("currentUser", JSON.stringify(user));
  }
  
  function getUsersList() {
	return JSON.parse(localStorage.getItem("usersList")) || [];
  }
  
  function setUsersList(users) {
	localStorage.setItem("usersList", JSON.stringify(users));
  }
  
  
  if (document.title === 'QuizUp - Redirecting') {
	window.location.href = '/auth/auth.html';
  }