"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegration = exports.updateIntegration = exports.createIntegration = void 0;
const Integration_1 = __importDefault(require("../models/Integration"));
// Create Integration
const createIntegration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, retellApiKey, vapiApiKey, airtableApiKey, ghlApiKey } = req.body;
        const existingIntegration = yield Integration_1.default.findOne({ userId });
        if (existingIntegration) {
            return res.status(400).json({
                success: false,
                message: "Integration already exists",
            });
        }
        const integration = new Integration_1.default({
            userId,
            retellApiKey,
            vapiApiKey,
            airtableApiKey,
            ghlApiKey,
        });
        yield integration.save();
        res.status(201).json({ success: true, integration });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createIntegration = createIntegration;
// Update Integration
const updateIntegration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { retellApiKey, vapiApiKey, airtableApiKey, ghlApiKey } = req.body;
        let integration = yield Integration_1.default.findOne({ userId });
        if (!integration) {
            return res
                .status(404)
                .json({ success: false, message: "Integration not found" });
        }
        integration.retellApiKey = retellApiKey || integration.retellApiKey;
        integration.vapiApiKey = vapiApiKey || integration.vapiApiKey;
        integration.airtableApiKey =
            airtableApiKey || integration.airtableApiKey;
        integration.ghlApiKey = ghlApiKey || integration.ghlApiKey;
        yield integration.save();
        res.status(200).json({ success: true, integration });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateIntegration = updateIntegration;
// Get Integration by User ID
const getIntegration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const integration = yield Integration_1.default.findOne({ userId });
        if (!integration) {
            return res
                .status(404)
                .json({ success: false, message: "Integration not found" });
        }
        res.status(200).json({ success: true, integration });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getIntegration = getIntegration;
