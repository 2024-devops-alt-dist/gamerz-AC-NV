import { Request, Response, NextFunction, response } from 'express';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

// Créer un user
export const postUser = async (req: Request, res: Response) => {
    try {
        console.log("données", req.body);
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthdate: new Date(req.body.birthdate),
            avatar: req.body.avatar,
            role: req.body.role,
            status: req.body.status
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



// export const getOneUser = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         console.log("id de getOneUser:", id);

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "ID invalide" });
//         }

//         const user = await User.findById(new mongoose.Types.ObjectId(id));

//         if (!user) {
//             return res.status(404).json({ message: "Utilisateur non trouvé" });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error("Erreur getOneUser:", error);
//         res.status(500).json({ message: "Erreur serveur", error });
//     }
// };


// // get one user
// export const getOneUser = async (req: Request, res: Response) => {
//     //const id = parseInt(req.params.id);
//     try {
//         const { id } = req.params;
//         console.log("id de getoneuser: " + id);
//         if (!id) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur serveur", error });
//     }
// };

// get one user
export const getOneUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
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
// export const putUser = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur serveur", error });
//     }
// };


// delete user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndDelete({ _id: id });
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};



