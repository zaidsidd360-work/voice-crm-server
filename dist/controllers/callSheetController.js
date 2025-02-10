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
exports.callContacts = void 0;
const server_sdk_1 = require("@vapi-ai/server-sdk");
const client = new server_sdk_1.VapiClient({
    token: "27736a48-a784-4a11-a9e8-13402825c744",
});
// Delay helper function
const delay = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
const callContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contacts, frequency } = req.body;
        console.log("Scheduling calls for:", contacts.length, "contacts");
        // Send initial response
        res.status(202).json({
            message: "Calls scheduled successfully",
            totalCalls: contacts.length,
        });
        // Process calls sequentially with delay
        for (const contact of contacts) {
            try {
                yield client.calls.create({
                    assistantId: "13df20aa-c174-48ce-963d-af1bd5806248",
                    assistantOverrides: {
                        variableValues: {
                            business: contact["Business name "],
                            offer: contact["Offer "],
                            additionalInfo: contact["Additional information "],
                        },
                    },
                    phoneNumberId: "6de0381b-5828-48a3-a2d4-28575e039779",
                    customer: {
                        number: `+91${contact["Phone number "]}`,
                        name: contact["Name"],
                    },
                });
                console.log(`Call scheduled for: ${contact["Name"]}`);
                // Wait 3 minutes before next call
                if (contacts.indexOf(contact) < contacts.length - 1) {
                    yield delay(frequency);
                }
            }
            catch (err) {
                console.error(`Failed to schedule call for ${contact["Name"]}:`, err);
            }
        }
    }
    catch (error) {
        console.error("Error processing call sheet:", error);
    }
});
exports.callContacts = callContacts;
