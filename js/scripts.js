class User {
	constructor(email, password) {
		this.email = email;
		this.password = password;
		this.scores = [];
	}

	updateScore(newScore) {
		this.scores.push(newScore);
	}
}

window.currentUser = null;
window.usersList = [];