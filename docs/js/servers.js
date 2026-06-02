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
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running"));
