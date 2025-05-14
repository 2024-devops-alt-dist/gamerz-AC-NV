import express, {Application} from "express";
import cors from "cors";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/usersRoutes.js'; 
import messagesRoutes from './routes/messagesRoutes.js'; 
import channelsRoutes from './routes/channelsRoutes.js'; 
import { Socket } from "socket.io";
import { Server } from "socket.io";
import http from "http";
import Message from "./models/messageModel.js";
//import socketController from "./controllers/socketsControllers.ts";
//import {router as userRoutes} from './routes/usersRoutes.js';
//import User from './models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
app.use(express.json());// accepter le format json sur les requetes
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5024", "https://gamerz-ac-nv-fork2.vercel.app"],
    credentials: true // nécessite le "Access-Control-Allow-Credentials" header à true => permet d'envoyer des cookies
})); 
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

app.use(cookieParser()); // Middleware pour parser les cookies


app.use((req, res, next) => {
    //console.log("🔍 Routes enregistrées :", app._router.stack.map((r: any) => r.route && r.route.path));
    console.log(`📢 Requête reçue: ${req.method} ${req.url}`);
    next();
});


app.use("/users", userRoutes);
app.use("/messages", messagesRoutes);
app.use("/channels", channelsRoutes);
app.use("/auth", authRoutes);


//SOCKET.IO
const channelUsers = new Map<string, Set<string>>();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5006", "http://localhost:5024","https://gamerz-ac-nv-fork2.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true //  header à true => permet d'envoyer des cookies
    }
});



io.on("connection", (socket: Socket) => {
    console.log(`🔌 Client connecté: ${socket.id}`);
socket.on("join", (channelId: string) => {
    console.log(`🔑 Client ${socket.id} a rejoint le canal ${channelId}`);
    socket.join(channelId);

    if (!channelUsers.has(channelId)) {
        channelUsers.set(channelId, new Set());
    }
    channelUsers.get(channelId)!.add(socket.id);

    // Broadcast la nouvelle liste des users connectés au channel
    io.to(channelId).emit("userList", Array.from(channelUsers.get(channelId)!));
});

socket.on("disconnect", () => {
    console.log(`❌ Client déconnecté: ${socket.id}`);
    
    for (const [channelId, usersSet] of channelUsers.entries()) {
        if (usersSet.has(socket.id)) {
            usersSet.delete(socket.id);
            // Mettre à jour la liste dans le salon
            io.to(channelId).emit("userList", Array.from(usersSet));
            // Si plus personne, on peut supprimer l'entrée (optionnel)
            if (usersSet.size === 0) {
                channelUsers.delete(channelId);
            }
        }
    }
});



    socket.on("message", (message) => {
        console.log(`📝 Message reçu de ${socket.id} :`, message);
        // if (!text.description || !text.sender || !text.channel){
        //     console.log("VOICI LE TEXTE" + text.description, text.sender, text.channel) // sécurité
        //     return;
        // };
        const newMessage = new Message({
            description: message.description,
            sender: message.sender,
            sendername: message.sendername,
            channel: message.channel,
            createdAt: new Date(),
        });
        // Save the message to the database
        try {
            newMessage.save()
                .then(() => {
                    console.log("Message enregistré dans la base de données" + newMessage);
                })
                .catch((err) => {
                    console.error("Erreur lors de l'enregistrement du message :", err);
                });
        }
        catch (err) {
            console.error("Erreur lors de l'enregistrement du message :", err);
        }
       
        console.log("MESSAGE", message);

        io.emit("message", {
            message,
            senderId: socket.id,
        });

    });
});


//socketController(io); // Passer l'instance de io au socketController qui n est pas encore refacto



async function connectDB() {
    try{ 
        //connect à mongodb
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error('MONGO_URL is not defined in the environment variables');
        }
        await mongoose.connect(mongoUrl);
        console.log('✅ Connecté à MongoDB');

        } catch (err) {
    console.error(err);
        } 
}

connectDB()


export {app, server};

