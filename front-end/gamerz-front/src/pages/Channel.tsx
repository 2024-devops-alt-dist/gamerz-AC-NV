import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

function Channel() {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io("http://localhost:5000", {
            withCredentials: true,
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("✅ Connecté à Socket.IO");
        });

        socketRef.current.on("message", (message: string) => {
            const messageList = document.getElementById("messages") as HTMLUListElement;
            const li = document.createElement("li");
            li.innerText = message;
            messageList.appendChild(li);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const send = () => {
        const input = document.getElementById("textMessage") as HTMLInputElement;
        socketRef.current?.emit("message", input.value);
        input.value = "";
    };

    return (
        <div>
            <h1>Channel</h1>
            <ul id="messages"></ul>
            <input type="text" id="textMessage" placeholder="Écris un message..."  className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none bg-white" />
            <button onClick={send} className="w-full py-2 mt-8 rounded bg-[#1EDCB3] hover:bg-[#00E7B5] text-gray-100 focus:outline-none">Envoyer</button>
        </div>
    );
}

export default Channel;
