"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const callSheetController_1 = require("../controllers/callSheetController");
const router = express_1.default.Router();
router.post("/", callSheetController_1.callContacts);
exports.default = router;
