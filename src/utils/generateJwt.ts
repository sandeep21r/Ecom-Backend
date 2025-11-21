import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (userId: string | Types.ObjectId) => {
  return jwt.sign(
    { userId: userId.toString() },  // convert ObjectId → string
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
};

