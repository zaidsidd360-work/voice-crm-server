import express from "express";
import {
	checkAvailability,
	createAppointmentInGHL,
	saveSummaryToAirtable,
	sendDataToGoHighLevel,
} from "../controllers/botresponseController";

const router = express.Router();

// router.post("/airtable", sendDataToAirtable);
router.post("/gohighlevel/contact", sendDataToGoHighLevel);

router.post("/gohighlevel/checkavailability", checkAvailability);
router.post("/gohighlevel/appointment", createAppointmentInGHL);

router.post("/end-call-summary", saveSummaryToAirtable);

export default router;
