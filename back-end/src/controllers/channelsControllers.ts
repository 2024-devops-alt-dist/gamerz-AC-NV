import { Request, Response, NextFunction } from 'express';
import Channel from '../models/channelModel';

// Créer un channel
export const postChannel = async (req: Request, res: Response) => {
    try {
        console.log("données", req.body);
        const newChannel = new Channel({
            channelName: req.body. channelName,
            description: req.body.description,
            admin: req.body.admin,
            subscribers: req.body.subscribers || [],
            connectedUsers: req.body.connectedUsers || [],
            });

        const savedChannel = await newChannel.save();
        res.status(200).json(savedChannel);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// get channels
export const getChannels = async (req: Request, res: Response) => {
    try {
        const channel = await Channel.find();
        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};


// get one channel
export const getOneChannel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("avant try", req.params);
    try {
        const { id } = req.params;
        const channel = await Channel.findById(id);
        console.log("object channel", channel);

        if (!channel) {
            res.status(404).json({ message: "Channel not found" });
            return;
        }
        res.status(200).json(channel);
    } catch (error) {
        console.error("Erreur getOneChannel:", error);
        next(error);
    }
};


// // update channel
export const updateChannel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const channel = await Channel.findByIdAndUpdate(id);
        if (!channel) {
            res.status(404).json({ message: "Channel not found" });
            return;
        }
        res.status(200).json(channel);
    } catch (error) {
        console.error("Erreur d'updateChannel:", error);
        next(error);
    }
};



// delete user
export const deleteChannel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("avant try", req.params);
    try {
        const { id } = req.params;
        const channel = await Channel.findByIdAndDelete(id);
        console.log("object channel", channel);

        if (!channel) {
            res.status(404).json({ message: "Channel not found" });
            return;
        }
        res.status(200).json(channel);
    } catch (error) {
        console.error("Erreur deleteUser:", error);
        next(error);
    }
};

