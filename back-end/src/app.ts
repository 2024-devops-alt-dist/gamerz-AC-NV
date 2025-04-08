import express, {Application} from "express";
import cors from "cors";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.ts';
import userRoutes from './routes/usersRoutes.ts'; 
import messagesRoutes from './routes/messagesRoutes.ts'; 
import channelsRoutes from './routes/channelsRoutes.ts'; 
//import {router as userRoutes} from './routes/usersRoutes.js';
//import User from './models/userModel.js';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
dotenv.config();

// Removed redundant declaration of io
const app: Application = express();
app.use(express.json());// accepter le format json sur les requetes
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5006"],
    credentials: true // nécessite le "Access-Control-Allow-Credentials" header à true => permet d'envoyer des cookies
})); 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});



const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
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