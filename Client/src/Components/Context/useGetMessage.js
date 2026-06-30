
import { useContext, useEffect, useState } from "react"
import useConversation from "../stateManage/useConversation";
import axios from "axios";
import { authDataContext } from "./AuthContext";

const useGetMessage = ()=>{
 const [loading,setLoading] = useState(false);
 const {messages,setMessages,selectedConversation} = useConversation();
 const {serverUrl} = useContext(authDataContext)
 useEffect(()=>{
   const getMessage = async()=>{
    setLoading(true);
   if(selectedConversation && selectedConversation._id){
    try{
        const res = await axios.get(`${serverUrl}/api/message/getmessage/${selectedConversation._id}`,{withCredentials:true})
        
        setMessages(res.data);
        setLoading(false);
    } catch (error) {
        console.log("Error In useGetMessage",error);
        setLoading(false);
    }
   }
   }
   getMessage()
 },[selectedConversation, serverUrl, setMessages]);
 return{
    messages,
    loading,
 };
}
export default useGetMessage