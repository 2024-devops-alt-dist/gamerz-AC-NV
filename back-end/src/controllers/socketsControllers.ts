import { Server, Socket } from "socket.io";
import Message from '../models/messageModel.js';



const socketController = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`🔌 Client connecté: ${socket.id}`);

        socket.on("join", (channelId: string) => {
            console.log(`🔑 Client ${socket.id} a rejoint le canal ${channelId}`);
            socket.join(channelId);
        });
        socket.on("disconnect", () => {
            console.log(`❌ Client déconnecté: ${socket.id}`);
        });

        //envoie le message à tous les clients dans le canal
        socket.on("message", async (messageData: { description: string; sender: string; channel: string }) => {
            console.log(`💬 Message reçu: ${messageData.description}`);

            // sauvegarde le message dans la base de données
            const newMessage = new Message({
                description: messageData.description,
                sender: messageData.sender,
                channel: messageData.channel,
                createdAt: new Date(),
            });

            try {
                const savedMessage = await newMessage.save();
                io.to(messageData.channel).emit("message", savedMessage); // emit = envoyer le message à tous les clients dans le canal
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });
    });
}
export default socketController;
