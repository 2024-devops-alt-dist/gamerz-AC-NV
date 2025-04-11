import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";

interface Message {
    id: number;
    text: string;
    fromSelf: boolean;
}

function Channel() {


    const { id } = useParams<{ id: string }>();
    console.log("id", id);

//fetch pour recp des infos du channel
useEffect(() => {
    const fetchChannelInfo = async () => {
        try {
            const response = await fetch(`http://localhost:5006/channels/${id}`, {
                credentials: "include",
            });
            if (!response.ok) throw new Error("Erreur lors de la récupération des informations du salon");
            const data = await response.json();
            console.log("Channel data:", data);
        } catch (error) {
            console.error("Erreur de récupération des informations du salon :", error);
        }
    }
    fetchChannelInfo();
}
, [id]);



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
            setMessages(prev => [...prev, { id: Date.now(), text: data.text, fromSelf }]);
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

    return (
        <div className="flex h-screen antialiased text-white">
            <div className="flex flex-row h-screen w-full overflow-x-hidden">
                {/* Sidebar - tu peux le laisser tel quel */}
                <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-black flex-shrink-0">
                    <span className="text-xs font-bold text-gray-500 uppercase mb-4">
                        <a href=""> ← retours aux salons</a>
                    </span>
                    <div className="flex flex-row items-center justify-center h-12 w-full">
                        <div className="ml-2 font-bold text-4xl">
                            <h1>Nom du Salon</h1>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Utilisateurs connectés</span>
                            <span className="flex items-center justify-center bg-black text-[#1EDCB3] h-4 w-4 rounded-full">4</span>
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
                                            <div className="text-xs text-gray-400 ml-3 mb-1">@{socketId}</div>
                                        )}
                                        <div
                                            className={`relative ${
                                                msg.fromSelf
                                                    ? "mr-3 bg-[#1EDCB3] text-white"
                                                    : "ml-3 bg-white/30 border-solid border-[#1EDCB3]"
                                            } text-sm py-2 px-4 shadow rounded-xl`}
                                        >
                                            <div>{msg.text}</div>
                                        </div>
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
