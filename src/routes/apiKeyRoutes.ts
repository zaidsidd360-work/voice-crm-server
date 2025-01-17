import express, { Router } from "express";
import {
	createApiKey,
	getApiKeys,
	updateApiKey,
	deleteApiKey,
} from "../controllers/apiKeyController";

const router: Router = express.Router();

// API Key routes
router.post("/", createApiKey);
router.get("/:userId", getApiKeys);
router.patch("/:id", updateApiKey);
router.delete("/:id", deleteApiKey);

export default router;
