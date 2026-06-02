import { supabaseClient } from "./supabaseClient.js";
import { loadChannels } from "./chat.js";

async function loadServers() {
  const { data, error } = await supabaseClient.from("servers").select("*");
  if (error) {
    console.error(error);
    return;
  }

  const list = document.getElementById("servers-list");
  list.innerHTML = "";

  data.forEach(server => {
    const div = document.createElement("div");
    div.className = "server-icon";
    div.textContent = server.name[0]?.toUpperCase() || "?";
    div.onclick = () => selectServer(server);
    list.appendChild(div);
  });

  if (data.length > 0) {
    selectServer(data[0]);
  }
}

async function selectServer(server) {
  window.currentServer = server;
  document.getElementById("server-name").textContent = server.name;
  await loadChannels(server.id);
}

export { loadServers, selectServer };
