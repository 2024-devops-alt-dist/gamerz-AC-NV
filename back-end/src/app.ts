// const mongoose =require('mongoose');
import mongoose from 'mongoose';
import User from './models/userModel.js';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();



//connectDB().catch(err => console.error(err));

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
        const firstUser = new User({
        username: 'francis',
        email: 'dalida@example.com',
        password: 'password123',
        role: 'admin',
        avatar: 'https://example.com/john-avatar.jpg',
        status: 'active',
        birthdate: new Date('1990-01-01')
        });
//sauvegarde de l'utilisateur
        const firstUserSave = await firstUser.save();
        console.log('firstuser', firstUserSave);
        } catch (err) {
    console.error(err);
        } 
}

connectDB()



