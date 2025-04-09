import express, {Application} from "express";
import cors from "cors";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.ts';
import userRoutes from './routes/usersRoutes.ts'; 
import messagesRoutes from './routes/messagesRoutes.ts'; 
import channelsRoutes from './routes/channelsRoutes.ts'; 
import { Socket } from "socket.io";
import { Server } from "socket.io";
import http from "http";
//import socketController from "./controllers/socketsControllers.ts";

//import {router as userRoutes} from './routes/usersRoutes.js';

//import User from './models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
app.use(express.json());// accepter le format json sur les requetes
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5024"],
    credentials: true // nécessite le "Access-Control-Allow-Credentials" header à true => permet d'envoyer des cookies
})); 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});



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
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5006", "http://localhost:5024"],
        methods: ["GET", "POST"],
        credentials: true //  header à true => permet d'envoyer des cookies
    }
});

server.listen(5024, () => {
    console.log("SOCKET IO:  Serveur démarré sur le port 5024");
});

io.on("connection", (socket: Socket) => {
    console.log(`🔌 Client connecté: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`❌ Client déconnecté: ${socket.id}`);
    });

    socket.on("join", (channelId: string) => {
        console.log(`🔑 Client ${socket.id} a rejoint le canal ${channelId}`);
        socket.join(channelId);
    });

    socket.on("message", (text) => {
        console.log(`📝 Message reçu de ${socket.id} :`, text);
        if (!text.trim()) return; // sécurité aussi ici
        io.emit("message", {
            text,
            senderId: socket.id,
        });
    });
});

//socketController(io); // Passer l'instance de io au socketController



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

export default app; 