import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";

interface JwtPayload {
  userId: string;
  role: "user" | "admin";
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Auth Middleware - Headers:", req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Fetch user
    const user: IUser | null = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    // Attach to req.user
    req.user = {
      _id: user._id.toString(),
      ...(user.phoneNumber ? { phone: user.phoneNumber } : {}),
      ...(user.googleId ? { googleId: user.googleId } : {}),
      role: user.role
    };

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
