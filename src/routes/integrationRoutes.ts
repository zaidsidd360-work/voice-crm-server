import express, { Router } from "express";
import {
	createIntegration,
	getIntegrations,
	getIntegration,
	updateIntegration,
	deleteIntegration,
} from "../controllers/integrationController";

const router: Router = express.Router();

// Integration routes
router.post("/", createIntegration);
router.get("/:userId", getIntegrations);
router.get("/:id", getIntegration);
router.patch("/:id", updateIntegration);
router.delete("/:id", deleteIntegration);

export default router;
