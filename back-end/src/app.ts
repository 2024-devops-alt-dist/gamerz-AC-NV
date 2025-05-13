// import express, {Application} from "express";
// import cors from "cors";
// import mongoose from 'mongoose';
// import cookieParser from "cookie-parser";
// import authRoutes from './routes/authRoutes';
// import userRoutes from './routes/usersRoutes'; 
// import messagesRoutes from './routes/messagesRoutes'; 
// import channelsRoutes from './routes/channelsRoutes'; 
// import { Socket } from "socket.io";
// import { Server } from "socket.io";
// import http from "http";
// import Message from "./models/messageModel";
// //import socketController from "./controllers/socketsControllers.ts";
// //import {router as userRoutes} from './routes/usersRoutes.js';
// //import User from './models/userModel.js';
// import dotenv from 'dotenv';
// dotenv.config();

// const app: Application = express();
// app.use(express.json());// accepter le format json sur les requetes
// app.use(cors({
//     origin: ["http://localhost:5173", "http://localhost:5024", "https://gamerz.vercel.app", "https://gamerz-leclone-vercel.vercel.app"],
//     credentials: true // nécessite le "Access-Control-Allow-Credentials" header à true => permet d'envoyer des cookies
// })); 
// // app.use((req, res, next) => {
// //     res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
// //     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
// //     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
// //     res.header("Access-Control-Allow-Credentials", "true");
// //     next();
// // });

// app.use(cookieParser()); // Middleware pour parser les cookies


// app.use((req, res, next) => {
//     //console.log("🔍 Routes enregistrées :", app._router.stack.map((r: any) => r.route && r.route.path));
//     console.log(`📢 Requête reçue: ${req.method} ${req.url}`);
//     next();
// });


// app.use("/users", userRoutes);
// app.use("/messages", messagesRoutes);
// app.use("/channels", channelsRoutes);
// app.use("/auth", authRoutes);


// //SOCKET.IO
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173", "http://localhost:5006", "http://localhost:5024", "https://gamerz.vercel.app","https://gamerz.vercel.app"],
//         methods: ["GET", "POST"],
//         credentials: true //  header à true => permet d'envoyer des cookies
//     }
// });

// server.listen(5024, () => {
//     console.log("SOCKET IO:  Serveur démarré sur le port 5024");
// });

// io.on("connection", (socket: Socket) => {
//     console.log(`🔌 Client connecté: ${socket.id}`);

//     socket.on("disconnect", () => {
//         console.log(`❌ Client déconnecté: ${socket.id}`);
//     });

//     socket.on("join", (channelId: string) => {
//         console.log(`🔑 Client ${socket.id} a rejoint le canal ${channelId}`);
//         socket.join(channelId);
//     });

//     socket.on("message", (message) => {
//         console.log(`📝 Message reçu de ${socket.id} :`, message);
//         // if (!text.description || !text.sender || !text.channel){
//         //     console.log("VOICI LE TEXTE" + text.description, text.sender, text.channel) // sécurité
//         //     return;
//         // };
//         const newMessage = new Message({
//             description: message.description,
//             sender: message.sender,
//             sendername: message.sendername,
//             channel: message.channel,
//             createdAt: new Date(),
//         });
//         // Save the message to the database
//         try {
//             newMessage.save()
//                 .then(() => {
//                     console.log("Message enregistré dans la base de données" + newMessage);
//                 })
//                 .catch((err) => {
//                     console.error("Erreur lors de l'enregistrement du message :", err);
//                 });
//         }
//         catch (err) {
//             console.error("Erreur lors de l'enregistrement du message :", err);
//         }
//         // console.log("MESSAGE", message);



//         // console.log("NOUVEAU MESSAGE", newMessage);
//         // newMessage.save()
//         //     .then(() => {
//         //         console.log("Message enregistré dans la base de données");
//         //     })
//         //     .catch((err) => {
//         //         console.error("Erreur lors de l'enregistrement du message :", err);
//         //     });
//         // Emit the message to all clients in the channel
//         console.log("MESSAGE", message);

//        // if (!message.trim()) return; // sécurité aussi ici

//         io.emit("message", {
//             message,
//             senderId: socket.id,
//         });

//     });
// });

// //socketController(io); // Passer l'instance de io au socketController



// async function connectDB() {
//     try{ 
//         //connect à mongodb
//         const mongoUrl = process.env.MONGO_URL;
//         if (!mongoUrl) {
//             throw new Error('MONGO_URL is not defined in the environment variables');
//         }
//         await mongoose.connect(mongoUrl);
//         console.log('✅ Connecté à MongoDB');

//         } catch (err) {
//     console.error(err);
//         } 
// }

// connectDB()

// export default app; 

import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/usersRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import channelsRoutes from "./routes/channelsRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://gamerz.vercel.app",
  "https://gamerz-leclone-vercel.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Logger
app.use((req, res, next) => {
  console.log(`📢 ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/messages", messagesRoutes);
app.use("/channels", channelsRoutes);

// Connexion DB
async function connectDB() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) throw new Error("MONGO_URL non défini");
    await mongoose.connect(mongoUrl);
    console.log("✅ Connecté à MongoDB");
  } catch (err) {
    console.error("❌ Erreur MongoDB :", err);
  }
}

connectDB();

export default app;
