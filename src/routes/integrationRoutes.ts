import express from "express";
import {
	createIntegration,
	updateIntegration,
	getIntegration,
} from "../controllers/integrationController.js";

const router = express.Router();

router.post("/integration", createIntegration);
router.put("/integration/:userId", updateIntegration);
router.get("/integration/:userId", getIntegration);

export default router;
