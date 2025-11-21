export declare const loginWithGoogle: (idToken: string) => Promise<{
    token: string;
    user: import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, {}> & import("../models/User").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    };
}>;
export declare const loginWithOtp: (phone: string) => Promise<{
    token: string;
    user: import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, {}> & import("../models/User").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map