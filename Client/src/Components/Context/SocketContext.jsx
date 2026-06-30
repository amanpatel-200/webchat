import React, { useState, createContext, useContext, useEffect } from "react";
import io from "socket.io-client";
import { userDataContext } from "./UserContext";
import { authDataContext } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const socketContext = createContext();

const SocketContext = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState([]);

  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
 
  useEffect(() => {
    if (!userData) return; // stop if not logged in

    // create socket
    const newSocket = io(serverUrl, {
      query: { userId: userData._id },
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSocket(newSocket);

    // listen online users
    newSocket.on("getOnline", (users) => {
      setOnline(users);
      
    });

    // cleanup when component unmount OR user logout
    return () => {
      newSocket.close();
      console.log("socket disconnected");
    };
  }, [userData, serverUrl]);

  return (
    <socketContext.Provider value={{ socket, online }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketContext;