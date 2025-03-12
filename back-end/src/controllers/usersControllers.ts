import { Request, Response } from 'express';
import User from '../models/userModel.js';

// Créer un user
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = new User({
            username: 'jeannette',
            email: 'jeanette@example.com',
            password: 'password123',
            role: 'admin',
            avatar: 'https://example.com/john-avatar.jpg',
            status: 'active',
            birthdate: new Date('1990-01-01')
            });

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// get user
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};



