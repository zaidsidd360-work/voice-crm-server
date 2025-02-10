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
const integrationRoutes_1 = __importDefault(require("./routes/integrationRoutes"));
const callSheetRoutes_1 = __importDefault(require("./routes/callSheetRoutes"));
const callTriggerRoutes_1 = __importDefault(require("./routes/callTriggerRoutes"));
const chrono_node_1 = require("chrono-node");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to DB
(0, db_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://srv697511.hstgr.cloud",
    "https://voice-crm-client.onrender.com",
];
// app.use((req, res, next) => {
// 	const origin = req.headers.origin;
// 	if (origin && allowedOrigins.includes(origin)) {
// 		res.setHeader("Access-Control-Allow-Origin", origin);
// 	}
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET, POST, PUT, PATCH, DELETE, OPTIONS"
// 	);
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"Content-Type, Authorization"
// 	);
// 	res.setHeader("Access-Control-Allow-Credentials", "true");
// 	if (req.method === "OPTIONS") {
// 		return res.sendStatus(200);
// 	}
// 	next();
// });
// app.use(
// 	cors({
// 		origin: function (origin, callback) {
// 			if (!origin || allowedOrigins.includes(origin)) {
// 				callback(null, true);
// 			} else {
// 				callback(new Error("Not allowed by CORS"));
// 			}
// 		},
// 		credentials: true,
// 		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
// 	})
// );
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
// Middleware
app.use(express_1.default.json());
// Root route
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Voice CRM Tool API",
        version: "1.0.0",
    });
});
// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
    });
});
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/keys", apiKeyRoutes_1.default);
app.use("/api/vapi", vapiRoutes_1.default);
app.use("/api/integrations", integrationRoutes_1.default);
app.use("/api/bot-response", botresponseRoutes_1.default);
app.use("/api/call-sheet", callSheetRoutes_1.default);
app.use("/api/call-trigger", callTriggerRoutes_1.default);
const chrono = new chrono_node_1.Chrono();
const parsedDate = chrono.parseDate("Coming friday at 2 pm");
console.log(parsedDate);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port https://localhost:${PORT}`);
});
