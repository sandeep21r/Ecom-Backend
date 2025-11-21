"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpLogin = exports.googleLogin = void 0;
const auth_service_1 = require("../services/auth.service");
const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;
        const result = await (0, auth_service_1.loginWithGoogle)(idToken);
        return res.json(result);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
exports.googleLogin = googleLogin;
const otpLogin = async (req, res) => {
    try {
        const { phone } = req.body;
        const result = await (0, auth_service_1.loginWithOtp)(phone);
        return res.json(result);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
exports.otpLogin = otpLogin;
//# sourceMappingURL=auth.controller.js.map