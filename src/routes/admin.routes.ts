import { Router } from "express";
import { getAllUsers, updateUserRole } from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";
const router = Router();

// Only admin allowed
router.get("/users", authMiddleware, adminOnly, getAllUsers);

// Update role
router.put("/users/:userId", authMiddleware, adminOnly, updateUserRole);

export default router;
