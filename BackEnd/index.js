import express from "express";
import { config } from "dotenv";
import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { connectDB } from "./utils/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Middleware to parse JSON request bodies with increased size limit (50MB)
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
app.use("/api/auth/", authRoute);
app.use("/api/messages/", messageRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
  connectDB();
});
