import { Console } from "console";
import User from "../models/User";
import {generateToken} from "../utils/generateJwt";
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
  console.log("Found User:", user);
  if (!user) {
    user = await User.create({
      googleId: sub,
      email,
      name,
      avatar: picture,
    });
  }

  const token = generateToken(user._id);
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
  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({ phone });
  }

  const token = generateToken(user._id);

  return { token, user };
};
