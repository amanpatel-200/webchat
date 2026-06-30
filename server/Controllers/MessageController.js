import Conversation from "../Models/conversation.model.js";
import Message from "../Models/message.model.js";
import { getRecieverSocketId } from "../socketio/server.js";
import { io } from "../socketio/server.js";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary.js";
export const sendMesssage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.userId;
    
    const { message } = req.body;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    let imageUrl = "";

if (req.file) {
  const uploadToCloudinary = () => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "chat-images",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(stream);
    });
  };

  const result = await uploadToCloudinary();

  imageUrl = result.secure_url;
}

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: message || "",
      image: imageUrl,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    const reciverSocketId = getRecieverSocketId(receiverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newmessage", newMessage);
    }
    return res.status(201).json({
      message: "message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.log("Error in send message:", error);
    return res.status(500).json({
      message: "Internal server error in sendMessage",
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.userId;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    let messages = conversation.messages;
    return res.status(201).json(messages);
  } catch (error) {
    console.log("Get Message Error", error);
    return res.status(500).json({ error: "Internel Server getmessage error" });
  }
};
