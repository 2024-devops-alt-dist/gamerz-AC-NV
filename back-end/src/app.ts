import express, {Application} from "express";
import cors from "cors";
import mongoose from 'mongoose';
import userRoutes from './routes/usersRoutes.ts'; 
//import {router as userRoutes} from './routes/usersRoutes.js';
//import User from './models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
app.use(express.json());// accepter le format json sur les requetes
app.use(cors());



app.use((req, res, next) => {
    console.log("🔍 Routes enregistrées :", app._router.stack.map((r: any) => r.route && r.route.path));
    console.log(`📢 Requête reçue: ${req.method} ${req.url}`);
    next();
});


app.use("/users", userRoutes);

// 🔍 Voir toutes les routes enregistrées dans Express
console.log("🔍 Routes enregistrées :", app._router.stack.map((r: any) => r.route && r.route.path));

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