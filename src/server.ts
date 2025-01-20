import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import botresponseRoutes from "./routes/botresponseRoutes";
import apiKeyRoutes from "./routes/apiKeyRoutes";
import vapiRoutes from "./routes/vapiRoutes";

dotenv.config();

const app = express();

// Connect to DB
connectDB();

const allowedOrigins = [
	"http://localhost:5173",
	"https://srv697511.hstgr.cloud",
	"https://voice-crm-client.onrender.com",
];

app.use((req, res, next) => {
	const origin = req.headers.origin;
	if (origin && allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, OPTIONS"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Credentials", "true");

	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	})
);

// app.use(
// 	cors({
// 		origin: allowedOrigins,
// 		credentials: true,
// 	})
// );
// Middleware
app.use(express.json());

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
app.use("/api/auth", authRoutes);
app.use("/api/keys", apiKeyRoutes);
app.use("/api/vapi", vapiRoutes);
app.use("/api/bot-response", botresponseRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port https://localhost:${PORT}`);
});
