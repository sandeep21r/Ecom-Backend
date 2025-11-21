import { Request, Response } from "express";
import { loginWithGoogle, loginWithOtp } from "../services/auth.service";

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    const result = await loginWithGoogle(idToken);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const otpLogin = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    const result = await loginWithOtp(phone);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
