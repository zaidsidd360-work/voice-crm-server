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
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["airtable", "gohighlevel"],
        required: true,
    },
    vapiApiKey: {
        type: String,
    },
    vapiToolId: {
        type: String,
        required: true,
    },
    // Airtable specific fields
    airtableToken: {
        type: String,
        required: function () {
            return this.type === "airtable";
        },
    },
    baseId: {
        type: String,
        required: function () {
            return this.type === "airtable";
        },
    },
    tableId: {
        type: String,
        required: function () {
            return this.type === "airtable";
        },
    },
    // GoHighLevel specific fields
    ghlApiKey: {
        type: String,
        required: function () {
            return this.type === "gohighlevel";
        },
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
}, {
    timestamps: true,
});
exports.default = model("Integration", IntegrationSchema);
