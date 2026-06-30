import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../Context/useGetMessage";
import Loading from "../Pages/Loading.jsx";
import useGetSocketMessage from "../Context/useGetSocketMessage.jsx";

const Messages = () => {
   useGetSocketMessage();
  const { messages, loading } = useGetMessage();
 
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 bg-slate-950">
      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message  key={message._id} message={message} />
          </div>
        ))
      ) : (
        <div className="text-center mt-[20%] font-bold">
          <p>Say! Hi</p>
        </div>
      )}
    </div>
  );
};

export default Messages;