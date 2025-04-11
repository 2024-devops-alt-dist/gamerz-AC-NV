
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams, Link } from "react-router-dom";

interface Message {
    id: string;
    description: string;
    fromSelf: boolean;
    createdAt: string
    sender: string;
    senderName?: string | null;
}

interface Channel {
    _id: string;
    channelName: string;
    connectedUsers: number;
    
   
}


function Channel() {
 
const { id } = useParams<{ id: string }>();
console.log("id", id);
    const [channel, setChannel] = useState<Channel | null>(null);
    console.log("channel", channel);
    console.log("id", id);

    const fetchChannel = async () => {
        try {
            const response = await fetch(`http://localhost:5006/channels/${id}`);
            console.log("J'essaye", id);

        
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération du channel");
            }
            const data = await response.json();
            console.log("data", data);
            setChannel(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchChannel();
    }, [id]);





    const [message, setMessage] = useState<Message | null>(null);
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:5006/messages/channel/${id}`); // id = channel ID
            console.log("📨 Récupération des messages du salon :", id);
    
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des messages");
            }
    
            const data = await response.json();
            const formattedMessages: Message[] = data.map((msg: any) => ({
                id: msg._id,
                description: msg.description,
                sender: typeof msg.sender === "string" ? msg.sender : msg.sender._id,
                senderName: typeof msg.sender === "object" ? msg.sender.username : null,
                fromSelf: (typeof msg.sender === "string" ? msg.sender : msg.sender._id) === socketRef.current?.id,
              }));



            console.log("💬 Messages récupérés au bon format :", formattedMessages);
            setMessages(formattedMessages); // ou adapte si tu veux les mapper
        } catch (error) {
            console.error("❌ Erreur fetchMessages :", error);
        }
    };
    


    useEffect(() => {
        if (id) {
            fetchMessages();
        }
    }, [id]);

    console.log("message", message);






    const socketRef = useRef<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [socketId, setSocketId] = useState<string | null>(null);
    console.log("socketId", socketId);

    useEffect(() => {
        socketRef.current = io("http://localhost:5024", {
            withCredentials: true,
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("✅ Connecté à Socket.IO");
            setSocketId(socketRef.current?.id || null);
        });

        socketRef.current.on("message", (data: { text: string; senderId: string }) => {
            console.log("📥 Reçu du serveur :", data);
            if (!data.text.trim()) return;
            const fromSelf = data.senderId === socketRef.current?.id;
            setMessages(prev => [...prev, { id: Date.now().toString(), description: data.text, fromSelf, createdAt: new Date().toISOString(), sender: data.senderId, senderName: null }]);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const send = () => {
        if (inputValue.trim() === "") return;
        socketRef.current?.emit("message", inputValue);
        setInputValue("");
        // ❌ On n'ajoute plus le message ici
    };

    if (!channel) {
        return <div>Loading...</div>;
    }



    return (
        <div className="flex h-screen antialiased text-white">
            <div className="flex flex-row h-screen w-full overflow-x-hidden">
                {/* Sidebar - tu peux le laisser tel quel */}
                <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-black flex-shrink-0">
                    <span className="text-xs font-bold text-gray-500 uppercase mb-4">
                    <Link to="/channelslist"> ← retours aux salons</Link>
                    </span>
                    <div className="flex flex-row items-center justify-center h-12 w-full">
                        <div className="ml-2 font-bold text-4xl">
                            <h1>{channel.channelName}</h1>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Joueurs connectés</span>
                            <span className="flex items-center justify-center bg-black text-[#1EDCB3] h-4 w-4 rounded-full">{channel.connectedUsers}</span>
                        </div>
                        <div className="flex flex-col space-y-1 mt-4 mx-2 h-48 overflow-y-auto">
                            <button className="flex flex-row items-center hover:bg-white/30 rounded-xl p-2">
                                <div className="ml-2 text-sm font-semibold">{socketId}</div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chat main area */}
                <div className="flex flex-col flex-auto h-screen p-6">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-black/50 h-full p-4">
                        {/* Liste des messages */}
                        <div className="flex flex-col h-0 flex-grow overflow-y-auto mb-6"> {/* Augmenté mb-4 à mb-6 */}
                            <div className="flex flex-col gap-y-2">




                                { /* Affichage des messages mongodb*/}
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`col-start-${
                                        msg.fromSelf ? "6" : "1"
                                    } col-end-${msg.fromSelf ? "13" : "8"} p-3 rounded-lg`}
                                >
                                    <div className={`flex flex-col ${msg.fromSelf ? "items-end" : "items-start"}`}>
                                        {/* Affichage du socketId au-dessus du message */}
                                        {!msg.fromSelf && (
                                            <div className="text-sm text-[#1EDCB3] ml-3 mb-1 font-black">@{msg.senderName} </div>
                                        )}
                                        <div
                                            className={`relative ${
                                                msg.fromSelf
                                                    ? "mr-3 bg-[#1EDCB3] text-white"
                                                    : "ml-3 bg-white/10 border-1 border-solid border-[#1EDCB3] rounded-l-b-0"
                                            } text-sm py-2 px-4 shadow rounded-xl`}
                                        >
                                            <div>{msg.description}
                                            
                                            </div>
                                            
                                        </div>
                                        <span className="text-xs text-gray-500 ml-3 mb-1">{msg.createdAt}</span>
                                    </div>
                                </div>
                            ))}



                            </div>
                        </div>

                        {/* Zone d’envoi de message */}
                        <div className="flex flex-row items-center h-16 rounded-xl w-full px-4 bg-black/70 mb-12"> {/* Ajouté mt-2 */}
                            <div className="flex-grow ml-4">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                send();
                                            }
                                        }}
                                        className="flex w-full border rounded-full bg-white/50 focus:outline-none focus:border-white pl-4 h-10"
                                        placeholder="Écris un message..."
                                    />
                                </div>
                            </div>
                            <div className="ml-4">
                                <button
                                    onClick={send}
                                    className="flex items-center justify-center bg-[#1EDCB3] hover:bg-[#1EDCB3] rounded-full text-white px-4 py-1 flex-shrink-0"
                                >
                                    <span>Send</span>
                                    <span className="ml-2">
                                        <svg
                                            className="w-4 h-4 transform rotate-45 -mt-px"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Channel;