import { io, Socket } from "socket.io-client";
import { baseURL } from "@/app/axiosApi/api";
import { useEffect, useState } from "react";

const SOCKET_SERVER_URL = baseURL;

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketInstance = io(SOCKET_SERVER_URL, {
    autoConnect: false,
  });

  useEffect(() => {
    setSocket(socketInstance);
    socketInstance.connect();

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
    });
    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket };
};
