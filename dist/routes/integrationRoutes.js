"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const integrationController_1 = require("../controllers/integrationController");
const router = express_1.default.Router();
// Integration routes
router.post("/", integrationController_1.createIntegration);
router.get("/:userId", integrationController_1.getIntegrations);
router.get("/:id", integrationController_1.getIntegration);
router.patch("/:id", integrationController_1.updateIntegration);
router.delete("/:id", integrationController_1.deleteIntegration);
exports.default = router;
