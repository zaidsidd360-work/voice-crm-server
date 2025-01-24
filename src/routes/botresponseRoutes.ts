import express from "express";
import {
	sendDataToAirtable,
	sendDataToGoHighLevel,
} from "../controllers/botresponseController";

const router = express.Router();

router.post("/airtable", sendDataToAirtable);
router.post("/gohighlevel", sendDataToGoHighLevel);

export default router;
