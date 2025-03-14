import { Request, Response, NextFunction } from 'express';
import Channel from '../models/channelModel.ts';

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

// get channel
export const getChannel = async (req: Request, res: Response) => {
    try {
        const channel = await Channel.find();
        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
