import jwt from 'jsonwebtoken'
import { User } from "../models/userSchema.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
   
    if (!token) {
      return res.status(401).json({ message: "Please login to access this route" });
    }
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) { 
    console.log("Error", error);
  }
};
