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
Object.defineProperty(exports, "__esModule", { value: true });
exports.callContact = void 0;
const server_sdk_1 = require("@vapi-ai/server-sdk");
const client = new server_sdk_1.VapiClient({
    token: "27736a48-a784-4a11-a9e8-13402825c744",
});
const callContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { contact_id, email, location: { id }, full_name, phone, } = req.body;
    const details = {
        contactId: contact_id,
        email: email,
        calendarId: "7wKC1lBMjbMjMmH9x0eS",
        locationId: id,
        name: full_name,
    };
    console.log(details);
    yield client.calls.create({
        assistantId: "84e1d53d-8caf-4f5a-bcc5-49f0e5e21ad4", // Helena
        assistantOverrides: {
            variableValues: Object.assign({}, details),
        },
        phoneNumberId: "6de0381b-5828-48a3-a2d4-28575e039779",
        customer: {
            number: phone,
            name: full_name,
        },
    });
    return res.status(200).json({});
});
exports.callContact = callContact;
