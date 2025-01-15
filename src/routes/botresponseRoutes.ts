import express from "express";
import { sendDataToAirtable } from "../controllers/botresponseController";

const router = express.Router();

router.post("/", sendDataToAirtable);

export default router;
