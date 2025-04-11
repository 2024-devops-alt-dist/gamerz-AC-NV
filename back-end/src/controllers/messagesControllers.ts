import { Request, Response, NextFunction } from 'express';
import Message from '../models/messageModel.js';
import mongoose from 'mongoose';

// Créer un message
export const postMessage = async (req: Request, res: Response) => {
    try {
        console.log("message", req.body);
        const newMessage = new Message({
            description: req.body.description,
            sender: req.body.sender,
            channel: req.body.channel,
            createdAt: new Date(req.body.createdAt),
            });

        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// get messages
export const getMessages = async (req: Request, res: Response) => {
    try {
        const message = await Message.find().populate("sender").populate("channel"); // populate pour les champs sender et channel
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// update user
export const updateMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        // Vérifie si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "ID invalide" });
            return;
        }

        const updatedMessage = await Message.findByIdAndUpdate(id, req.body, { new: true }).populate("sender").populate("channel"); // populate pour les champs sender et channel

        if (!updatedMessage) {
            res.status(404).json({ message: "Message non trouvé" });
            return;
        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error("Erreur updateMessage:", error);
        next(error); // Passe l'erreur au middleware d'erreur
    }
};




// get one user
export const getOneMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("avant try", req.params);
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        console.log("object message", message);

        if (!message) {
            res.status(404).json({ message: "Message not found" });
            return;
        }
        res.status(200).json(message);
    } catch (error) {
        console.error("Erreur getOneMessage:", error);
        next(error);
    }
};


// get channel messages
export const getChannelMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("avant try", req.params);
    try {
        const { channelId } = req.params;
        const message = await Message.find({ channel: channelId}).populate("sender").populate("channel"); // populate pour les champs sender et channel
        console.log("object message", message);

        if (!message) {
            res.status(404).json({ message: "Messages not found" });
            return;
        }
        res.status(200).json(message);
    } catch (error) {
        console.error("Erreur getChannelMessages:", error);
        next(error);
    }
};

// delete message
export const deleteMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("avant try", req.params);
    try {
        const { id } = req.params;
        const message = await Message.findByIdAndDelete(id).populate("sender").populate("channel"); // populate pour les champs sender et channel
        console.log("object user", message);

        if (!message) {
            res.status(404).json({ message: "Message not found" });
            return;
        }
        res.status(200).json(message);
    } catch (error) {
        console.error("Erreur deleteUser:", error);
        next(error);
    }
};