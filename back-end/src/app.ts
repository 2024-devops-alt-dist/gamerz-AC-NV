import express, {Application} from "express";
import cors from "cors";
import mongoose from 'mongoose';
import userRoutes from './routes/usersRoutes.js'; 
//import User from './models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
app.use(express.json());// accepter le format json sur les requetes
app.use(cors());


const path = `/`;
app.use(path, userRoutes);

async function connectDB() {
    try{ 
        //await mongoose.connect(process.env.MONGO_URL);
        // const User =mongoose.model('User',{
    //     name: String,
    //     email: String,
    //     password: String,
    //     role: String,
    //     avatar: String,
    //     status: String,
    //     birthdate: Date

    // });
        //connect à mongodb
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error('MONGO_URL is not defined in the environment variables');
        }
        await mongoose.connect(mongoUrl);
        console.log('✅ Connecté à MongoDB');
    //création d'un utilisateur
        // const firstUser = new User({
        // username: 'claire',
        // email: 'clair@example.com',
        // password: 'password123',
        // role: 'admin',
        // avatar: 'https://example.com/john-avatar.jpg',
        // status: 'active',
        // birthdate: new Date('1990-01-01')
        // });
//sauvegarde de l'utilisateur
        // const firstUserSave = await firstUser.save();
        // console.log('firstuser', firstUserSave);
        } catch (err) {
    console.error(err);
        } 
}

connectDB()

// Définition des routes
app.use("/api/users", userRoutes); // Associe les routes à l'URL /api/users

export default app;