import { useState, useContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import useConversation from "../stateManage/useConversation.js";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { messages, setMessages, selectedConversation } =
    useConversation();

  const { serverUrl } = useContext(authDataContext);

  const sendMessage = async (message, image) => {
    if (!message?.trim() && !image) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", message || "");

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(
        `${serverUrl}/api/message/send/${selectedConversation._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

     

      setMessages((prev) => [...prev, res.data.newMessage]);
    } catch (error) {
      console.log(
        "Error in sendMessage:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;