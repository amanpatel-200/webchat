import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import useSendMessage from "../Context/useSendMessage";
import { encryptMessage } from "../../utils/crypto";

const Typing = () => {
  const { sendMessage } = useSendMessage();

  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent empty sends
    if (!message.trim() && !selectedImage) return;
    
     const encrypted = encryptMessage(message);
    await sendMessage(encrypted, selectedImage);

    setMessage("");
    setSelectedImage(null);

    // Clear file input
    const fileInput = document.getElementById("image-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col bg-gray-800 px-3 py-2">
        
        {/* Selected Image Name */}
        {selectedImage && (
          <div className="text-green-400 text-sm mb-2">
            📷 {selectedImage.name}
          </div>
        )}

        <div className="flex h-[8vh] items-center space-x-2">
          
          {/* Image Upload */}
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            hidden
            onChange={(e) => {
              if (e.target.files[0]) {
                setSelectedImage(e.target.files[0]);
              }
            }}
          />

          <label
            htmlFor="image-upload"
            className="text-2xl cursor-pointer p-2 rounded-lg hover:bg-slate-900"
          >
            <FaImage />
          </label>

          {/* Message Input */}
          <input
            type="text"
            placeholder="Type here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input grow outline-none input-bordered bg-slate-900 rounded-lg"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="text-3xl cursor-pointer p-2 rounded-lg hover:bg-slate-900"
          >
            <IoSend />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Typing;