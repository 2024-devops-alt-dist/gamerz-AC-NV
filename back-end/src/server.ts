// import app from './app.js';

// const PORT = parseInt(process.env.PORT || '5006', 10);
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on port http://0.0.0.0:${PORT}`);
//   //listen api docs
// //  console.log(`Listening on port http://localhost:${PORT}/api-docs`);
// });


import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { Socket } from "socket.io";
import Message from "./models/messageModel";

const PORT = parseInt(process.env.PORT || '5006', 10);

const allowedOrigins = [
  "http://localhost:5173",
  "https://gamerz-leclone-url.vercel.app"
];

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`🔌 Client connecté: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`❌ Déconnexion: ${socket.id}`);
  });

  socket.on("join", (channelId: string) => {
    console.log(`📢 ${socket.id} a rejoint le canal ${channelId}`);
    socket.join(channelId);
  });

  socket.on("message", async (message) => {
    console.log(`📝 Message de ${socket.id}:`, message);
    try {
      const newMessage = new Message({
        description: message.description,
        sender: message.sender,
        sendername: message.sendername,
        channel: message.channel,
        createdAt: new Date(),
      });

      await newMessage.save();
      io.emit("message", {
        message,
        senderId: socket.id,
      });
    } catch (err) {
      console.error("❌ Erreur message:", err);
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur en ligne sur http://0.0.0.0:${PORT}`);
});
