import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "local.env" });

export const connectDB = async () => {
  try {
     const DB_NAME = "ecommerce";
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};
