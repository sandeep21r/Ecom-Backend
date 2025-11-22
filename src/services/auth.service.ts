import { Console } from "console";
import User from "../models/User";
import { generateToken } from "../utils/generateJwt";
import axios from "axios";

export const loginWithGoogle = async (idToken: string) => {
  console.log("Google ID Token:", idToken);
  if (!idToken) throw new Error("Missing Google token");

  // Verify the token with Google
  const googleRes = await axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
  );
  console.log("Google Response Data:", googleRes.data);
  const { sub, email, name, picture } = googleRes.data;

  // Find user or create new one


  try {
    // 1) Try to find user by Google sub (unique google user id)
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        loginType: "google"
      });
    }

    const token = generateToken(user);
    console.log("Generated JWT Token:", token);
    return { token, user };

  } catch (error) {
    console.error("❌ Error in Google Login Service:", error);
    throw new Error("Failed to login with Google");
  }
};

export const loginWithOtp = async (phone: string) => {
  if (!phone) throw new Error("Phone number required");

  // Find or create user
  console.log("Phone Number for OTP Login:", phone);
  let user = await User.findOne({ phoneNumber: phone });
  console.log("Phone Number for OTP Login:", phone);
  if (!user) {
    user = await User.create({ phoneNumber: phone, loginType: "phone" });
  }

  const token = generateToken(user);

  return { token, user };
};
