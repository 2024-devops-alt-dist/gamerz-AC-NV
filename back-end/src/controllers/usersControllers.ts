


import { Request, Response, NextFunction, response } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { sendAdminEmail } from '../utils/sendAdminEmail.js';
import jwt from 'jsonwebtoken';

console.log("allo allo bcrypt", bcrypt);
//import mongoose from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

// Créer un user
export const postUser = async (req: Request, res: Response) => {
    try {
        console.log("données du postuser", req.body);
        // Hash du pw avant de créer le user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log("password hash:", hashedPassword);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            birthdate: new Date(req.body.birthdate),
            avatar: req.body.avatar,
            role: req.body.role,
            motivation: req.body.motivation,
           // status: req.body.status
            status: 'pending',
            });

        const savedUser = await newUser.save();
        
        await sendAdminEmail(savedUser); // Envoi de l'email à l'admin
        res.status(200).json(savedUser);
        console.log("apres hash données", req.body);

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// get user
export const getUser = async (req: Request, res: Response) => {
    const { status } = req.query;  // recup statut
    const filter = status ? { status } : {};  // filtre par statut
    try {
        const users = await User.find(filter);    
        res.status(200).json(users);   
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
    const token = req.cookies.token;
    console.log("🧁 Token reçu :", token);

    if (!token) {
      res.status(401).json({ message: "Token manquant" });
      return;
    }

    const secret = process.env.JWT_SECRET_KEY as string;
    console.log("🔐 Clé secrète utilisée :", secret);

    const decoded = jwt.verify(token, secret) as { userId: string };
    console.log("📦 Données du token décodé :", decoded);

    const user = await User.findById(decoded.userId).select("-password");
    console.log("👤 Utilisateur trouvé :", user);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("💥 Erreur dans getCurrentUser :", error);
    res.status(500).json({ message: "Erreur serveur get currentuser", error });
  }
};


// get one user
export const getOneUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("avant try", req.params);
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        console.log("object user", user);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Erreur getOneUser:", error);
        next(error);
    }
};


// // update user
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const updateFields = req.body;
  
      const user = await User.findByIdAndUpdate(id, updateFields, { new: true });
  
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Erreur updateUser:", error);
      next(error);
    }
  };
  


// delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("avant try", req.params);
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        console.log("object user", user);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Erreur deleteUser:", error);
        next(error);
    }
};

















// Fonction pour approuver un utilisateur
export const approveUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { status: "approved" }, { new: true });
      if (!updatedUser) {
        res.status(404).send("Utilisateur non trouvé");
      }
      res.status(200).send("Utilisateur approuvé avec succès");
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  };
  
  // Fonction pour refuser un utilisateur
  export const refuseUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { status: "refused" }, { new: true });
      if (!updatedUser) {
        res.status(404).send("Utilisateur non trouvé");
      }
      res.status(200).send("Utilisateur refusé");
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  };