
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

export const authUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password } = req.body;

        //est ce que le user existe ?
        const user = await User.findOne({ username });

        if (!user) {
            res.status(401).json({ message: 'Utilisateur non trouvé' });
            return;
        }

        // mdp dans le user = mdp envoyé ?
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Mot de passe incorrect' });
            return;
        }

        // genener le token JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET_KEY as string, 
            { expiresIn: '24h' }
        );
    //     const refreshToken = jwt.sign(
    //         { userId: user._id, username: user.username, role: user.role },
    //         process.env.JWT_SECRET_KEY as string,
    //         { expiresIn: '7d' }
    //     );
    //    console.log("refreshToken", refreshToken)
        console.log("token", token)
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // sameSite: 'lax',
            // secure: false, // true si HTTPS
        });
        console.log("🍪 Cookie envoyé", cookieParser);


        res.status(200).json({ message: 'Authentification réussie' });

    } catch (error) {
        console.error('Erreur authUser :', error);
        next(error);
    }
};













