import Message from "../models/messageSchema.js";
import { User } from "../models/userSchema.js";
import cloudinary from "../utils/cloudinary.js";
// import {getReceiverSocketId,io} from "../lib/socket.js"

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("Error in getUserForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senerId: myId, receiverId: userToChatId },
        { senerId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(("Error in getMessage:", error.message));
    res.status(500).json({ error: "internal server error" });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save()
    //todo: realtime functionality goes here=> socket connection

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(("Error in sendMessage:", error.message));
    res.status(500).json({ error: "internal server error" });
  }
};
