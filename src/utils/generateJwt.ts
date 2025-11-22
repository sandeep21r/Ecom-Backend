import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

export const generateToken = (user: IUser) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
};

