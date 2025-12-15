const socket = io();

const MessageForm = document.getElementById("msgForm");
const MessageInput = document.getElementById("msgInput");
const MessageSend = document.getElementById("sendMsg");
const UserName = document.getElementById("user");
const Container = document.getElementById("message-container");

MessageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage(MessageInput.value);
  MessageInput.value = "";
});

MessageSend.addEventListener("click", () => {
  sendMessage(MessageInput.value);
  MessageInput.value = "";
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
  Container.insertAdjacentHTML(
    "beforeend",
    `
          <div class="bg-white m-2 p-2 rounded-xl w-fit ml-auto">
            <h3 class="text-black text-xl">${message}</h3>
            <div class="flex justify-between">
              <h4 class="text-black text-xs mr-2">${time}</h4>
              <h4 class="text-black text-xs ml-2">You</h4>
            </div>
          </div>
  `
  );
  socket.emit("message", data);
}

function RecievedMessage(data) {
  Container.insertAdjacentHTML(
    "beforeend",
    `
        <div class="bg-black m-2 p-2 rounded-xl w-fit mr-auto">
          <h3 class="text-white text-xl">${data.content}</h3>
          <div class="flex justify-between">
            <h4 class="text-white text-xs mr-2">${data.time}</h4>
            <h4 class="text-white text-xs ml-2">${data.name}</h4>
          </div>
        </div>
    `
  );
}

socket.on("chat-message", (data) => {
  console.log("recieved: ", data.content);
  RecievedMessage(data);
});
