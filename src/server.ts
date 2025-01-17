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

const allowedOrigins = ["http://localhost:5173", "*"];

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/keys", apiKeyRoutes);
app.use("/api/vapi", vapiRoutes);
app.use("/api/bot-response", botresponseRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port https://localhost:${PORT}`);
});
