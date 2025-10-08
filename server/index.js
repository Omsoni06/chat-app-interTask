import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();
const users = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", ({ username, room }) => {
    socket.join(room);

    users.set(socket.id, { username, room, socketId: socket.id });

    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    rooms.get(room).add(socket.id);

    const roomUsers = Array.from(rooms.get(room)).map((id) => users.get(id));

    io.to(room).emit("room_users", roomUsers);

    io.to(room).emit("message", {
      username: "System",
      text: `${username} has joined the chat`,
      timestamp: new Date().toISOString(),
      isSystem: true,
    });
  });

  socket.on("send_message", ({ room, message, username }) => {
    io.to(room).emit("message", {
      username,
      text: message,
      timestamp: new Date().toISOString(),
      isSystem: false,
    });
  });

  socket.on("typing", ({ room, username }) => {
    socket.to(room).emit("user_typing", { username });
  });

  socket.on("stop_typing", ({ room }) => {
    socket.to(room).emit("user_stop_typing");
  });

  socket.on("disconnect", () => {
    const user = users.get(socket.id);

    if (user) {
      const { username, room } = user;

      if (rooms.has(room)) {
        rooms.get(room).delete(socket.id);

        const roomUsers = Array.from(rooms.get(room)).map((id) =>
          users.get(id)
        );
        io.to(room).emit("room_users", roomUsers);

        if (rooms.get(room).size === 0) {
          rooms.delete(room);
        }
      }

      users.delete(socket.id);

      io.to(room).emit("message", {
        username: "System",
        text: `${username} has left the chat`,
        timestamp: new Date().toISOString(),
        isSystem: true,
      });
    }

    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
