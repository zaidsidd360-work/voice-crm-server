"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const callTriggerController_1 = require("../controllers/callTriggerController");
const router = express_1.default.Router();
router.post("/", callTriggerController_1.callContact);
exports.default = router;
