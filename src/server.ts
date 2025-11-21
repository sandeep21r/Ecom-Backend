import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config({ path: "./local.env" });

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*"}));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
