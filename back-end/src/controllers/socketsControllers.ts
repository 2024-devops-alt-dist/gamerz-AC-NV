import { Server, Socket } from "socket.io";
import Message from '../models/messageModel.js';



const socketController = (io: Server) => {


    io.on("connection", (socket: Socket) => {
    console.log(`🔌 Client connecté: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`❌ Client déconnecté à socket io : ${socket.id}`);
    });

    socket.on("message", (message: string) => {
        console.log(`💬 Message reçu: ${message}`);
        // Emit the message to all connected clients
        io.emit("message", message);
    });

        // socket.on("join", (channelId: string) => {
    //     console.log(`🔑 Client ${socket.id} a rejoint le canal ${channelId}`);
    //     socket.join(channelId);
    // });

    // socket.on("sendMessage", async (message: string, channelId: string) => {
    //     console.log(`💬 Message reçu dans le canal ${channelId}: ${message}`);
    //     // Save the message to the database
    //     const newMessage = new Message({ content: message, channelId });
    //     await newMessage.save();
    //     // Emit the message to all clients in the channel
    //     io.to(channelId).emit("message", message);
    // });

});
}
export default socketController;
