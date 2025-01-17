"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const botresponseRoutes_1 = __importDefault(require("./routes/botresponseRoutes"));
const apiKeyRoutes_1 = __importDefault(require("./routes/apiKeyRoutes"));
const vapiRoutes_1 = __importDefault(require("./routes/vapiRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to DB
(0, db_1.default)();
const allowedOrigins = ["http://localhost:5173", "*"];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/keys", apiKeyRoutes_1.default);
app.use("/api/vapi", vapiRoutes_1.default);
app.use("/api/bot-response", botresponseRoutes_1.default);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port https://localhost:${PORT}`);
});
