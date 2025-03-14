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
        const message = await Message.find();
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// update user
export const updateMessage = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;
        const updatedMessage = await Message.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedMessage) {
            return res.status(404).json({ message: "Message non trouvé" });
        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
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
        const { channel } = req.params;
        const message = await Message.find({ channel: channel});
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
        const message = await Message.findByIdAndDelete(id);
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

