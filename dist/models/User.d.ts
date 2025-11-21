import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    googleId?: string;
    phoneNumber?: string;
    name?: string;
    email?: string;
    loginType: "google" | "phone";
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map