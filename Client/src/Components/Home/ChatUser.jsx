import React, { useContext } from "react";
import linkedin from "../assets/linkedin.png";
import useConversation from "../stateManage/useConversation";
import { socketContext } from "../Context/SocketContext";
const ChatUser = () => {
  const{selectedConversation} = useConversation();
 
  const {online} = useContext(socketContext);
  const getOnlineUserStatus = (userId)=>{
    return online.includes(userId)?"online":"offline"
  }
  return (
    <div className="flex items-center justify-start p-4 space-x-3 bg-gray-800 hover:bg-gray-600 duration-300 h-[8vh]">
      <div className="">
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img src={linkedin} />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl">
           {selectedConversation.name}
         </h1>
         <span className="text-sm text-slate-400">{getOnlineUserStatus(selectedConversation._id)}</span>
      </div>
    </div>
  );
};

export default ChatUser;
