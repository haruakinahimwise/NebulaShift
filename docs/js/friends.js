import { supabaseClient } from "./supabaseClient.js";

async function addFriend(targetId) {
  const { error } = await supabaseClient
    .from("friendships")
    .insert({
      requester_id: window.currentUser.id,
      receiver_id: targetId,
      status: "pending"
    });

  if (error) console.error(error);
  else alert("Friend request sent!");
}

async function acceptFriend(requestId) {
  const { error } = await supabaseClient
    .from("friendships")
    .update({ status: "accepted" })
    .eq("id", requestId);

  if (error) console.error(error);
}

export { addFriend, acceptFriend };
