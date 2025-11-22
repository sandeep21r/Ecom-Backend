import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  googleId?: string;
  phoneNumber?: string;
  name?: string;
  email?: string;
  loginType: "google" | "phone";
  role: "user" | "admin";

}

const UserSchema = new Schema<IUser>(
  {

    googleId: { type: String },
    phoneNumber: { type: String },
    name: { type: String },
    email: { type: String },
    loginType: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
