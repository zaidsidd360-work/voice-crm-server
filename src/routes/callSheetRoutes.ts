import express, { Router } from "express";
import { callContacts } from "../controllers/callSheetController";

const router: Router = express.Router();

router.post("/", callContacts);

export default router;
