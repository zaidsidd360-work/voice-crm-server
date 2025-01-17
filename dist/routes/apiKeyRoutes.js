"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiKeyController_1 = require("../controllers/apiKeyController");
const router = express_1.default.Router();
// API Key routes
router.post("/", apiKeyController_1.createApiKey);
router.get("/:userId", apiKeyController_1.getApiKeys);
router.patch("/:id", apiKeyController_1.updateApiKey);
router.delete("/:id", apiKeyController_1.deleteApiKey);
exports.default = router;
