import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getMessage, getUserForSidebar } from "../controllers/messagecontroller.js";

const route = express.Router();

route.get('/users', protectRoute,getUserForSidebar)
route.get('/id:', protectRoute,getMessage)
route.post("/send/:id",protectRoute,getMessage)

export default route