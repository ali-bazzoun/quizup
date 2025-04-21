document.addEventListener("DOMContentLoaded", () => {
  const userTableBody = document.getElementById("user-table-body");
  const logoutButton = document.getElementById("logout-btn");

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser || currentUser.role !== 'admin') {
    alert("Access denied. Admins only.");
    window.location.href = "auth.html";
    return;
  }

  console.log('Admin logged in:', currentUser);

  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];

  usersList.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.email}</td>
      <td>${user.scores.length > 0 ? user.scores.join(", ") : "No scores yet"}</td>
    `;
    userTableBody.appendChild(row);
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem('currentUser');
    window.location.href = "auth.html";
  });
});