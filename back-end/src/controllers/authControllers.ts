import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

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

        res.status(200).json({ message: 'Authentification réussie' });

    } catch (error) {
        console.error('Erreur authUser :', error);
        next(error);
    }
};
