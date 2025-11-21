"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithOtp = exports.loginWithGoogle = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateJwt_1 = require("../utils/generateJwt");
const axios_1 = __importDefault(require("axios"));
const loginWithGoogle = async (idToken) => {
    console.log("Google ID Token:", idToken);
    if (!idToken)
        throw new Error("Missing Google token");
    // Verify the token with Google
    const googleRes = await axios_1.default.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    console.log("Google Response Data:", googleRes.data);
    const { sub, email, name, picture } = googleRes.data;
    // Find user or create new one
    try {
        // 1) Try to find user by Google sub (unique google user id)
        let user = await User_1.default.findOne({ googleId: sub });
        if (!user) {
            user = await User_1.default.create({
                googleId: sub,
                email,
                name,
                avatar: picture,
                loginType: "google",
            });
        }
        const token = (0, generateJwt_1.generateToken)(user._id);
        console.log("Generated JWT Token:", token);
        return { token, user };
    }
    catch (error) {
        console.error("❌ Error in Google Login Service:", error);
        throw new Error("Failed to login with Google");
    }
};
exports.loginWithGoogle = loginWithGoogle;
const loginWithOtp = async (phone) => {
    if (!phone)
        throw new Error("Phone number required");
    // Find or create user
    console.log("Phone Number for OTP Login:", phone);
    let user = await User_1.default.findOne({ phoneNumber: phone });
    console.log("Phone Number for OTP Login:", phone);
    if (!user) {
        user = await User_1.default.create({ phoneNumber: phone, loginType: "phone" });
    }
    const token = (0, generateJwt_1.generateToken)(user._id);
    return { token, user };
};
exports.loginWithOtp = loginWithOtp;
//# sourceMappingURL=auth.service.js.map