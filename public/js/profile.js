function renderUserPanel() {
  if (!window.currentUser) return;
  document.getElementById("user-username").textContent = window.currentUser.username;
  document.getElementById("user-status").textContent = window.currentUser.status || "online";
}

export { renderUserPanel };
