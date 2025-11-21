import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  googleId?: string;
  phoneNumber?: string;
  name?: string;
  email?: string;
  loginType: "google" | "phone";
}

const UserSchema = new Schema<IUser>(
  {

    googleId: { type: String },
    phoneNumber: { type: String },
    name: { type: String },
    email: { type: String },
    loginType: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
