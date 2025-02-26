import { io, Socket } from "socket.io-client";
import { baseURL } from "@/app/axiosApi/api";
import { useEffect, useState } from "react";

const SOCKET_SERVER_URL = "https://hrphelo.wavebeep.com/";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketInstance = io(SOCKET_SERVER_URL, {
    autoConnect: false,
  });

  useEffect(() => {
    setSocket(socketInstance);
    socketInstance.connect();
  
    socketInstance.on("connect", () => {
      // console.log("Connected to socket server");
    });
    socketInstance.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
    });
    socketInstance.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
    });
    socketInstance.io.on("error", (error) => {
      console.error("Socket.IO error:", error);
    });
  
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket };
};
