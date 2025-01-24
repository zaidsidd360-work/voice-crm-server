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
exports.sendDataToGoHighLevel = exports.sendDataToAirtable = void 0;
const airtable_1 = __importDefault(require("airtable"));
const base = new airtable_1.default({
    apiKey: "patu3bTCvjKcj1dAH.14bdd086d57abbd25e028e8225211f1aca60f9ce95e0ce0526a47d19a4522379",
}).base("appFBqZs4uvwCGzkm");
const sendDataToAirtable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    if (message.type === "tool-calls") {
        const vapiFn = message.toolCalls[0].function;
        try {
            const record = yield base("Lead").create(vapiFn.arguments);
            console.log(record);
            return res.status(200).json({
                success: true,
                result: "Your data has been saved successfully.",
            });
        }
        catch (error) {
            return res
                .status(500)
                .json({ result: "Failed to save your data." });
        }
    }
    console.log(message.toolCalls[0].function);
    // console.log(name, email);
    // if (!name || !email) {
    // 	return res.status(400).json({ error: "Name and email are required" });
    // }
    try {
        // res.status(200).json({
        // 	message: "Data sent to Airtable successfully",
        // 	record,
        // });
    }
    catch (error) {
        console.error("Error sending data to Airtable:", error);
        res.status(500).json({ error: "Failed to send data to Airtable" });
    }
});
exports.sendDataToAirtable = sendDataToAirtable;
const sendDataToGoHighLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    if (message.type === "tool-calls") {
        const vapiFn = message.toolCalls[0].function;
        console.log(vapiFn.arguments);
        try {
            const response = yield fetch("https://services.leadconnectorhq.com/contacts/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer pit-1d95f255-cbe9-47e5-8d29-5b9a529698d0",
                    "Content-Type": "application/json",
                    Version: "2021-07-28",
                },
                body: JSON.stringify({
                    name: vapiFn.arguments.name,
                    email: vapiFn.arguments.email,
                    locationId: "ndfliIZ7QjE5bL6LUgVY",
                    phone: vapiFn.arguments.phone,
                }),
            });
            const data = yield response.json();
            console.log(data);
            return res.status(200).json({
                success: true,
                result: "Your data has been saved successfully.",
            });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ result: "Failed to save your data." });
        }
    }
});
exports.sendDataToGoHighLevel = sendDataToGoHighLevel;
