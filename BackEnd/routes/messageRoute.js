import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getMessage, getUserForSidebar,sendMessage } from "../controllers/messagecontroller.js";

const route = express.Router();

route.get('/users', protectRoute, getUserForSidebar)
route.get('/:id', protectRoute, getMessage)
route.post("/send/:id", protectRoute, sendMessage)

export default route