"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const botresponseController_1 = require("../controllers/botresponseController");
const router = express_1.default.Router();
// router.post("/airtable", sendDataToAirtable);
router.post("/gohighlevel/contact", botresponseController_1.sendDataToGoHighLevel);
router.post("/gohighlevel/checkavailability", botresponseController_1.checkAvailability);
router.post("/gohighlevel/appointment", botresponseController_1.createAppointmentInGHL);
exports.default = router;
