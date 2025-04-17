import express from "express";
import {
  checkAuth,
  login,
  logout,
  profileUpdate,
  signup,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/signup", signup);

route.post("/login", login);

route.post("/logout", logout);

route.put("/profileUpdate", protectRoute, profileUpdate);
route.get("/check", protectRoute, checkAuth);

export default route;
