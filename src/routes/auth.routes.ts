import { Router } from "express";
import { googleLogin, otpLogin } from "../controllers/auth.controller";

const router = Router();

// Google login
router.post("/google", googleLogin);

// OTP login
router.post("/otp", otpLogin);

export default router;
