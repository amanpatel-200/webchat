import { useContext, useEffect } from "react";
import { socketContext } from "./SocketContext";
import useConversation from "../stateManage/useConversation.js";

const useGetSocketMessage = () => {
  const { socket } = useContext(socketContext);
  const { setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      
      setMessages((prev) => {
        if (!Array.isArray(prev)) return [newMessage];
        return [...prev, newMessage];
      });
    };

    socket.on("newmessage", handleNewMessage);
    return () => socket.off("newmessage", handleNewMessage);
  }, [socket, setMessages]);
};

export default useGetSocketMessage;