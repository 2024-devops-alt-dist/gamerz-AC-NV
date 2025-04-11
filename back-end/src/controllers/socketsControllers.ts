// import { Server, Socket } from "socket.io";
// import Message from '../models/messageModel.js';



// const socketController = (io: Server) => {
//     io.on("connection", (socket: Socket) => {
//         console.log(`🔌 Client connecté: ${socket.id}`);

//         socket.on("join", (channelId: string) => {
//             console.log(`🔑 Client ${socket.id} a rejoint le canal ${channelId}`);
//             socket.join(channelId);
//         });
//         socket.on("disconnect", () => {
//             console.log(`❌ Client déconnecté: ${socket.id}`);
//         });

//         //envoie le message à tous les clients dans le canal
//         socket.on("message", async (messageData) => {
//             if (!messageData.description || !messageData.sender || !messageData.channel) {
//                 console.error("Erreur: Données manquantes dans le message:", messageData);
//                 return;
//             }
            
//             // Sauvegarder le message dans la base de données
//             const newMessage = new Message({
//                 description: messageData.description,
//                 sender: messageData.sender,
//                 channel: messageData.channel,
//                 createdAt: new Date(),
//             });
        
//             try {
//                 const savedMessage = await newMessage.save();
//                 io.to(messageData.channel).emit("message", {
//                     id: savedMessage._id,
//                     description: savedMessage.description,
//                     sender: savedMessage.sender,
//                     createdAt: savedMessage.createdAt,
//                     channel: savedMessage.channel,
//                 });
//             } catch (error) {
//                 console.error("Erreur lors de la sauvegarde du message:", error);
//             }
//         });
        
//     });
// }
// export default socketController;