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
exports.deleteIntegration = exports.updateIntegration = exports.getIntegration = exports.getIntegrations = exports.createIntegration = void 0;
const Integration_1 = __importDefault(require("../models/Integration"));
const errors_1 = require("../utils/errors");
const createIntegration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, name, type, vapiApiKey, vapiToolId, airtableToken, baseId, tableId, ghlApiKey, } = req.body;
        if (!name || !type || !vapiApiKey || !vapiToolId) {
            throw new errors_1.BadRequestError("Missing required fields");
        }
        console.log(userId);
        const integration = yield Integration_1.default.create(Object.assign(Object.assign({ userId,
            name,
            type,
            vapiApiKey,
            vapiToolId }, (type === "airtable" && { airtableToken, baseId, tableId })), (type === "gohighlevel" && { ghlApiKey })));
        res.status(201).json({
            success: true,
            data: integration,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createIntegration = createIntegration;
const getIntegrations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const integrations = yield Integration_1.default.find({ userId });
        res.status(200).json({
            success: true,
            data: integrations,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getIntegrations = getIntegrations;
const getIntegration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const integration = yield Integration_1.default.findOne({
            _id: id,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        if (!integration) {
            throw new errors_1.BadRequestError("Integration not found");
        }
        res.status(200).json({
            success: true,
            data: integration,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getIntegration = getIntegration;
const updateIntegration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const updates = req.body;
        const integration = yield Integration_1.default.findOne({
            _id: id,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        if (!integration) {
            throw new errors_1.BadRequestError("Integration not found");
        }
        const updatedIntegration = yield Integration_1.default.findByIdAndUpdate(id, Object.assign({}, updates), { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            data: updatedIntegration,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateIntegration = updateIntegration;
const deleteIntegration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const integration = yield Integration_1.default.findOne({
            _id: id,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        if (!integration) {
            throw new errors_1.BadRequestError("Integration not found");
        }
        yield Integration_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteIntegration = deleteIntegration;
