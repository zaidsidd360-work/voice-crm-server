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
exports.updateApiKey = exports.deleteApiKey = exports.getApiKeys = exports.createApiKey = void 0;
const errors_1 = require("../utils/errors");
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const createApiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, key, userId } = req.body;
        console.log(name, key, userId);
        // if (!name || !key) {
        // 	throw new BadRequestError("Please provide both name and key");
        // }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            throw new errors_1.UnauthorizedError("User not found");
        }
        const apiKey = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            name,
            key,
            createdAt: new Date(),
        };
        user.apiKeys.push(apiKey);
        yield user.save();
        res.status(201).json({
            success: true,
            data: { apiKey },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createApiKey = createApiKey;
const getApiKeys = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        console.log(userId);
        const user = yield User_1.default.findById(userId);
        if (!user) {
            throw new errors_1.UnauthorizedError("User not found");
        }
        res.status(200).json({
            success: true,
            data: { apiKeys: (_a = user === null || user === void 0 ? void 0 : user.apiKeys) !== null && _a !== void 0 ? _a : [] },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getApiKeys = getApiKeys;
const deleteApiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { keyId } = req.params;
        const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (!user) {
            throw new errors_1.UnauthorizedError("User not found");
        }
        user.apiKeys = user.apiKeys.filter((key) => key._id.toString() !== keyId);
        yield user.save();
        res.status(200).json({
            success: true,
            data: { message: "API key deleted successfully" },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteApiKey = deleteApiKey;
const updateApiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { keyId } = req.params;
        const { name, key } = req.body;
        const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (!user) {
            throw new errors_1.UnauthorizedError("User not found");
        }
        const apiKey = user.apiKeys.find((key) => key._id.toString() === keyId);
        if (!apiKey) {
            throw new errors_1.BadRequestError("API key not found");
        }
        if (name)
            apiKey.name = name;
        if (key)
            apiKey.key = key;
        yield user.save();
        res.status(200).json({
            success: true,
            data: { apiKey },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateApiKey = updateApiKey;
