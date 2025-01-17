"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vapiController_1 = require("../controllers/vapiController");
const router = express_1.default.Router();
router.get("/tools/:vapitoken", vapiController_1.getTools);
exports.default = router;
