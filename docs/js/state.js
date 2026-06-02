let currentUser = null;
let currentServer = null;
let currentChannel = null;

function loadSession() {
  const raw = localStorage.getItem("nebula_user");
  if (raw) currentUser = JSON.parse(raw);
  window.currentUser = currentUser;
}

function saveSession(user) {
  currentUser = user;
  window.currentUser = user;
  localStorage.setItem("nebula_user", JSON.stringify(user));
}

function clearSession() {
  currentUser = null;
  window.currentUser = null;
  localStorage.removeItem("nebula_user");
}

export {
  currentUser,
  currentServer,
  currentChannel,
  loadSession,
  saveSession,
  clearSession
};
