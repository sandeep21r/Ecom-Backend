import { Request, Response } from "express";
import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log("Admin User ID:", req.user?._id);
    const users = await User.find()
    return res.json({ users });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to load users" });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    console.log(`Updating role for User ID: ${userId} to Role: ${role}`);
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role:role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(`Updating role for User ID: ${userId} to Role: ${role}`);

    return res.json({  success: true,message: "Role updated", user: updatedUser });
  } catch (error: any) {
    console.error("Error updating role:", error);
    return res.status(500).json({ error: "Failed to update user role" });
  }
};
