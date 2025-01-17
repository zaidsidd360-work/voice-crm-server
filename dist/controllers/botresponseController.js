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
exports.sendDataToAirtable = void 0;
const airtable_1 = __importDefault(require("airtable"));
const base = new airtable_1.default({
    apiKey: "patu3bTCvjKcj1dAH.232bd2feb82fe4be336fd4c10ccc7cc9a14d93485b799a61320f01f9ba1a33e2",
}).base("appFBqZs4uvwCGzkm");
const sendDataToAirtable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body.args;
    // console.log(req.body);
    console.log(name, email);
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }
    try {
        const record = yield base("Lead").create({
            Name: name,
            Email: email,
            Phone: "(987) 563-9459",
            "Business Name": "New Corp",
        });
        res.status(200).json({
            message: "Data sent to Airtable successfully",
            record,
        });
    }
    catch (error) {
        console.error("Error sending data to Airtable:", error);
        res.status(500).json({ error: "Failed to send data to Airtable" });
    }
});
exports.sendDataToAirtable = sendDataToAirtable;
