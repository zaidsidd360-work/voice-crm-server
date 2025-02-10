import express from "express";
import {
	checkAvailability,
	createAppointmentInGHL,
	sendDataToGoHighLevel,
} from "../controllers/botresponseController";

const router = express.Router();

// router.post("/airtable", sendDataToAirtable);
router.post("/gohighlevel/contact", sendDataToGoHighLevel);

router.post("/gohighlevel/checkavailability", checkAvailability);
router.post("/gohighlevel/appointment", createAppointmentInGHL);

export default router;
