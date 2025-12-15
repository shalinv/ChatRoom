const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = require("socket.io")(server);

let users = 0;
const TIME = 1000 * 60 * 3; //3minutes

io.on("connection", onConnected);

function onConnected(socket) {
  console.log(socket.id);

  if (users == 0) {
    setTimeout(() => {
      io.emit("chat:destroyed");
    }, TIME);
  }

  users++;

  socket.on("disconnect", () => {
    users--;
    console.log("Socket Disconnected: ", socket.id);
  });

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("chat-message", data);
  });
}
