import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "local.env" });

export const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI!);
  
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};
