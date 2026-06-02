import { supabaseClient } from "./supabaseClient.js";

let sub = null;

async function loadChannels(serverId) {
  const { data, error } = await supabaseClient
    .from("channels")
    .select("*")
    .eq("server_id", serverId);

  if (error) {
    console.error(error);
    return;
  }

  const list = document.getElementById("channels-list");
  list.innerHTML = "";

  data.forEach(ch => {
    const div = document.createElement("div");
    div.className = "channel-item";
    div.innerHTML = `<span>#</span>${ch.name}`;
    div.onclick = () => selectChannel(ch, div);
    list.appendChild(div);
  });

  if (data.length > 0) {
    selectChannel(data[0], list.firstChild);
  }
}

async function selectChannel(channel, el) {
  window.currentChannel = channel;

  document.querySelectorAll(".channel-item")
    .forEach(x => x.classList.remove("active"));
  if (el) el.classList.add("active");

  document.getElementById("chat-title").textContent = `#${channel.name}`;

  await loadMessages(channel.id);
}

async function loadMessages(channelId) {
  const { data, error } = await supabaseClient
    .from("messages")
    .select("*, users:user_id(*)")
    .eq("channel_id", channelId)
    .order("created_at");

  if (error) {
    console.error(error);
    return;
  }

  renderMessages(data);
  subscribe(channelId);
}

function renderMessages(msgs) {
  const list = document.getElementById("messages-list");
  list.innerHTML = "";

  msgs.forEach(m => {
    const row = document.createElement("div");
    row.className = "message-row";
    row.innerHTML = `
      <div class="message-avatar"></div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-username">${m.users?.username || "User"}</span>
          <span class="message-timestamp">${new Date(m.created_at).toLocaleTimeString()}</span>
        </div>
        <div class="message-text">${m.content}</div>
      </div>
    `;
    list.appendChild(row);
  });

  list.scrollTop = list.scrollHeight;
}

function subscribe(channelId) {
  if (sub) supabaseClient.removeChannel(sub);

  sub = supabaseClient
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `channel_id=eq.${channelId}`
      },
      payload => {
        const m = payload.new;
        const list = document.getElementById("messages-list");

        const row = document.createElement("div");
        row.className = "message-row";
        row.innerHTML = `
          <div class="message-avatar"></div>
          <div class="message-content">
            <div class="message-header">
              <span class="message-username">${window.currentUser?.username || "You"}</span>
              <span class="message-timestamp">${new Date(m.created_at).toLocaleTimeString()}</span>
            </div>
            <div class="message-text">${m.content}</div>
          </div>
        `;
        list.appendChild(row);
        list.scrollTop = list.scrollHeight;
      }
    )
    .subscribe();
}

function initChatInput() {
  const input = document.getElementById("chat-input");
  input.onkeydown = async e => {
    if (e.key === "Enter") {
      const content = input.value.trim();
      input.value = "";
      if (!content) return;
      if (!window.currentUser || !window.currentChannel) return;

      await supabaseClient.from("messages").insert([{
        user_id: window.currentUser.id,
        channel_id: window.currentChannel.id,
        content
      }]);
    }
  };
}

export { loadChannels, selectChannel, initChatInput };
