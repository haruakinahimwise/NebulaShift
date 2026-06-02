import { loadSession, clearSession } from "./state.js";
import { initCloak } from "./cloak.js";
import { loadServers } from "./servers.js";
import { initChatInput } from "./chat.js";
import { renderUserPanel } from "./profile.js";

window.addEventListener("DOMContentLoaded", async () => {
  loadSession();

  if (!window.currentUser) {
    window.location.href = "login.html";
    return;
  }

  renderUserPanel();
  initCloak();
  initChatInput();
  await loadServers();

  document.getElementById("logout-btn").onclick = () => {
    clearSession();
    window.location.href = "login.html";
  };
});
