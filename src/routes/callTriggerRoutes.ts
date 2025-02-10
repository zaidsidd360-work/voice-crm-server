import express, { Router } from "express";
import { callContact } from "../controllers/callTriggerController";

const router: Router = express.Router();

router.post("/", callContact);

export default router;
