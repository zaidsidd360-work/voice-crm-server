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
exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../utils/errors");
const User_1 = __importDefault(require("../models/User"));
const generateTokens = (userId) => {
    var _a, _b;
    const accessToken = jsonwebtoken_1.default.sign({ userId }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "secret", { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({ userId }, (_b = process.env.JWT_REFRESH_SECRET) !== null && _b !== void 0 ? _b : "refresh_secret", { expiresIn: "7d" });
    return { accessToken, refreshToken };
};
// ------ Register User ------
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            throw new errors_1.BadRequestError("User already exists");
        }
        const user = yield User_1.default.create({
            name,
            email,
            password,
        });
        const userId = user._id.toString();
        const { accessToken, refreshToken } = generateTokens(userId);
        user.refreshToken = refreshToken;
        yield user.save();
        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: userId,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                accessToken,
                refreshToken,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
// ------ Login User ------
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            throw new errors_1.BadRequestError("Please provide email and password");
        }
        const user = yield User_1.default.findOne({ email }).select("+password");
        if (!user) {
            throw new errors_1.UnauthorizedError("Not a registered user");
        }
        const userId = user._id.toString();
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            throw new errors_1.UnauthorizedError("Incorrect password");
        }
        if (role === "admin" && user.role === "user") {
            throw new errors_1.UnauthorizedError("Can't login as admin, please select the user role");
        }
        const { accessToken, refreshToken } = generateTokens(userId);
        user.refreshToken = refreshToken;
        yield user.save();
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: userId,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                accessToken,
                refreshToken,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
// ------ Refresh Token ------
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        throw new errors_1.UnauthorizedError("Refresh token is required");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = yield User_1.default.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            throw new errors_1.UnauthorizedError("Invalid refresh token");
        }
        const userId = user._id.toString();
        const tokens = generateTokens(userId);
        user.refreshToken = tokens.refreshToken;
        yield user.save();
        res.status(200).json({
            success: true,
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            },
        });
    }
    catch (error) {
        throw new errors_1.UnauthorizedError("Invalid refresh token");
    }
});
exports.refreshToken = refreshToken;
// ------ Logout User ------
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw new errors_1.UnauthorizedError("Not authorized");
        }
        const user = yield User_1.default.findById(req.user._id);
        if (user) {
            user.refreshToken = undefined;
            yield user.save();
        }
        res.status(200).json({
            success: true,
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
