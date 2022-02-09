const express = require("express");
const app = express();
app.use(express.json());
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
const BASE_URL_MongoDB =
  "";

mongoose.connect(`${BASE_URL_MongoDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(userRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`user with id: ${socket.id} joined room : ${room}`);
  });
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(3002, () => {
  console.log(`socket server running.`);
});

app.listen(3001, () => {
  console.log(`Server running.`);
});
