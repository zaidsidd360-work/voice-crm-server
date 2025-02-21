import express, { Router } from "express";
import { callContact, callContactRetell } from "../controllers/callTriggerController";

const router: Router = express.Router();

router.post("/", callContactRetell);

export default router;
