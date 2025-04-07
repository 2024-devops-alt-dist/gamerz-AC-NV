import { Request, Response, NextFunction, response } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { sendAdminEmail } from '../utils/sendAdminEmail.js';
console.log("allo allo bcrypt", bcrypt);
//import mongoose from 'mongoose';

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
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
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
        const user = await User.findByIdAndUpdate(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Erreur dupdateUser:", error);
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