"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const botresponseController_1 = require("../controllers/botresponseController");
const router = express_1.default.Router();
router.post("/airtable", botresponseController_1.sendDataToAirtable);
router.post("/gohighlevel", botresponseController_1.sendDataToGoHighLevel);
exports.default = router;
