// import express, {Application} from "express";
// import cors from "cors";
// import mongoose from 'mongoose';
// import cookieParser from "cookie-parser";
// import authRoutes from './routes/authRoutes.ts';
// import userRoutes from './routes/usersRoutes.ts'; 
// import messagesRoutes from './routes/messagesRoutes.ts'; 
// import channelsRoutes from './routes/channelsRoutes.ts'; 
// import { Socket } from "socket.io";
// import { Server } from "socket.io";
// import http from "http";
// import Message from './models/messageModel.js';

// //import socketController from "./controllers/socketsControllers.ts";

// //import {router as userRoutes} from './routes/usersRoutes.js';

// //import User from './models/userModel.js';
// import dotenv from 'dotenv';
// dotenv.config();

// const app: Application = express();
// app.use(express.json());// accepter le format json sur les requetes
// app.use(cors({
//     origin: ["http://localhost:5173", "http://localhost:5024"],
//     credentials: true // nécessite le "Access-Control-Allow-Credentials" header à true => permet d'envoyer des cookies
// })); 
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

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
//         origin: ["http://localhost:5173", "http://localhost:5006", "http://localhost:5024"],
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

//     socket.on("message", async (text) => {
//         // console.log(`📝 Message reçu de ${socket.id} :`, text);
//         // if (!text.description || !text.sender || !text.channel){
//         //     console.error("Erreur: Données manquantes dans le message:", text);
//         //     console.log("il manque ceci : ", text.description, text.sender, text.channel);
//         //     return;
//         // } ; // sécurité aussi ici
//         // const newMessage = new Message({
//         //     description: text.description,
//         //     sender: text.sender,
//         //     channel: text.channel,
//         //     createdAt: new Date(),

//         // });
//         // // Sauvegarder le message dans la base de données
//         // try {
//         //     const savedMessage = await newMessage.save();
//         //     io.to(text.channel).emit("message", {
//         //         id: savedMessage._id,
//         //         description: savedMessage.description,
//         //         sender: savedMessage.sender,
//         //         createdAt: savedMessage.createdAt,
//         //         channel: savedMessage.channel,
//         //     });
//         // } catch (error) {
//         //     console.error("Erreur lors de la sauvegarde du message:", error);
//         // }
//         console.log(`📝 Message reçu de ${socket.id} :`, text);
//         if (!text.trim()) return; // sécurité aussi ici
//         io.emit("message", {
//             text,
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
import Message from './models/messageModel.js';

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

// MODIF DE VENDREDI : mix de app et de socketController - à refactoriser
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

    socket.on("message", async (text) => {
        console.log(`📝 Message reçu de ${socket.id} :`, text);
        if (!text.description || !text.sender || !text.channel){
            console.error("Erreur: Données manquantes dans le message:", text);
            console.log("il manque ceci : ", text.description, text.sender, text.channel);
            return;
        } ; // sécurité aussi ici
        const newMessage = new Message({
            description: text.description,
            sender: text.sender,
            channel: text.channel,
            createdAt: new Date(),

        });
        // Sauvegarder le message dans la base de données
        try {
            const savedMessage = await newMessage.save();
            io.to(text.channel).emit("message", {
                id: savedMessage._id,
                description: savedMessage.description,
                sender: savedMessage.sender,
                createdAt: savedMessage.createdAt,
                channel: savedMessage.channel,
            });
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du message:", error);
        }
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