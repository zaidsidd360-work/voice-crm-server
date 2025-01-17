"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const integrationController_js_1 = require("../controllers/integrationController.js");
const router = express_1.default.Router();
router.post("/integration", integrationController_js_1.createIntegration);
router.put("/integration/:userId", integrationController_js_1.updateIntegration);
router.get("/integration/:userId", integrationController_js_1.getIntegration);
exports.default = router;
