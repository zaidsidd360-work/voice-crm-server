"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const IntegrationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    retellApiKey: {
        type: String,
        required: false,
    },
    vapiApiKey: {
        type: String,
        required: false,
    },
    airtableApiKey: {
        type: String,
        required: false,
    },
    ghlApiKey: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = model("Integration", IntegrationSchema);
