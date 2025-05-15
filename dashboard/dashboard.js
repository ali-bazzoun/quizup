document.addEventListener("DOMContentLoaded", () => {
  const userTableBody = document.getElementById("user-table-body");
  const logoutButton = document.getElementById("logout-btn");

  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') {
    alert("Access denied. Admins only.");
    window.location.href = "/auth/auth.html";
    return;
  }

  const usersList = getUsersList();
  usersList.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.email}</td>
      <td>${Array.isArray(user.scores) && user.scores.length > 0 ? user.scores.join(", ") : "No scores yet"}</td>
    `;
    userTableBody.appendChild(row);
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "auth.html";
  });
});
