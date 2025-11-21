"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config({ path: "./local.env" });
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
// Connect DB
(0, db_1.connectDB)();
// Routes
app.use("/api/auth", auth_routes_1.default);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map