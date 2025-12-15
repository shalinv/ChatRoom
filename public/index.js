const socket = io();

const MessageForm = document.getElementById("msgForm");
const MessageInput = document.getElementById("msgInput");
const MessageSend = document.getElementById("sendMsg");
const UserName = document.getElementById("user");

MessageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage(MessageInput.value);
});

MessageSend.addEventListener("click", () => {
  sendMessage(MessageInput.value);
});

function sendMessage(message) {
  console.log(message);
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const data = {
    name: UserName.value,
    content: message,
    time: time,
  };

  socket.emit("message", data);
}

socket.on("chat-message", (data) => {
  console.log("recieved: ", data.content);
});
