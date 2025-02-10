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
exports.checkAvailability = exports.createAppointmentInGHL = exports.sendDataToGoHighLevel = void 0;
// import Airtable from "airtable";
const chrono_node_1 = require("chrono-node");
// const base = new Airtable({
// 	apiKey: "patu3bTCvjKcj1dAH.14bdd086d57abbd25e028e8225211f1aca60f9ce95e0ce0526a47d19a4522379",
// }).base("appFBqZs4uvwCGzkm");
// export const sendDataToAirtable = async (req: Request, res: Response) => {
// 	const { message } = req.body;
// 	if (message.type === "tool-calls") {
// 		const vapiFn = message.toolCalls[0].function;
// 		try {
// 			const record = await base("Lead").create(vapiFn.arguments);
// 			console.log(record);
// 			return res.status(200).json({
// 				success: true,
// 				result: "Your data has been saved successfully.",
// 			});
// 		} catch (error) {
// 			return res
// 				.status(500)
// 				.json({ result: "Failed to save your data." });
// 		}
// 	}
// 	console.log(message.toolCalls[0].function);
// 	// console.log(name, email);
// 	// if (!name || !email) {
// 	// 	return res.status(400).json({ error: "Name and email are required" });
// 	// }
// 	try {
// 		// res.status(200).json({
// 		// 	message: "Data sent to Airtable successfully",
// 		// 	record,
// 		// });
// 	} catch (error) {
// 		console.error("Error sending data to Airtable:", error);
// 		res.status(500).json({ error: "Failed to send data to Airtable" });
// 	}
// };
const sendDataToGoHighLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    console.log("hello");
    if (message.type === "tool-calls") {
        const vapiFn = message.toolCalls[0].function;
        console.log(vapiFn.arguments);
        try {
            const response = yield fetch("https://services.leadconnectorhq.com/contacts/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer pit-71024ffe-d723-4761-9ff2-a88c79f733f1",
                    "Content-Type": "application/json",
                    Version: "2021-07-28",
                },
                body: JSON.stringify({
                    name: vapiFn.arguments.name,
                    email: vapiFn.arguments.email,
                    locationId: "ndfliIZ7QjE5bL6LUgVY",
                    phone: vapiFn.arguments.phone,
                    tag: vapiFn.arguments.leadCategory,
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
const createAppointmentInGHL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { message } = req.body;
    const toolCallId = (_b = (_a = message === null || message === void 0 ? void 0 : message.toolCalls) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id;
    if (message.type === "tool-calls") {
        const vapiFn = message.toolCalls[0].function;
        console.log(vapiFn.arguments);
        const { locationId, contactId, dateTime } = vapiFn.arguments;
        try {
            const response = yield fetch("https://services.leadconnectorhq.com/calendars/events/appointments", {
                method: "POST",
                headers: {
                    Authorization: "Bearer pit-71024ffe-d723-4761-9ff2-a88c79f733f1",
                    Version: "2021-04-15",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    calendarId: "7wKC1lBMjbMjMmH9x0eS",
                    locationId: locationId,
                    contactId: contactId,
                    startTime: dateTime,
                }),
            });
            const data = yield response.json();
            console.log(data);
            // if (
            // 	data.status === "booked" &&
            // 	data.appointmentStatus === "confirmed"
            // ) {
            return res.status(200).send({
                results: [
                    {
                        toolCallId: toolCallId,
                        result: "Great! Your appointment has been scheduled.",
                    },
                ],
            });
            // } else {
            //   return res.status(400).send({
            //     results: [
            //       {
            //         toolCallId: toolCallId,
            //         result: "Sorry, we couldn't schedule your appointment. Please try again later.",
            //       },
            //     ],
            //   });
            // }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({
                results: [
                    {
                        toolCallId: toolCallId,
                        result: "Sorry, we couldn't schedule your appointment.",
                    },
                ],
            });
        }
    }
});
exports.createAppointmentInGHL = createAppointmentInGHL;
const checkAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { message } = req.body;
    const toolCallId = (_b = (_a = message === null || message === void 0 ? void 0 : message.toolCalls) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id;
    if (message.type === "tool-calls") {
        const vapiFn = message.toolCalls[0].function;
        const chrono = new chrono_node_1.Chrono();
        const parsedDate = chrono.parseDate(vapiFn.arguments.dateTime);
        const unixDate = parsedDate === null || parsedDate === void 0 ? void 0 : parsedDate.getTime();
        console.log(vapiFn.arguments.dateTime, parsedDate, unixDate);
        const yyyymmdd = parsedDate === null || parsedDate === void 0 ? void 0 : parsedDate.toISOString().split("T")[0];
        if (!yyyymmdd) {
            return res.status(400).send({
                results: [
                    {
                        toolCallId: toolCallId,
                        result: "Sorry, no available slots for the given date.",
                    },
                ],
            });
        }
        // Get free slots
        const calendarId = "7wKC1lBMjbMjMmH9x0eS";
        const response = yield fetch(`https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots?startDate=${unixDate}&endDate=${unixDate}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer pit-71024ffe-d723-4761-9ff2-a88c79f733f1",
                Version: "2021-04-15",
            },
        });
        const slotsData = yield response.json();
        const availableDates = Object.keys(slotsData);
        console.log(slotsData);
        if (availableDates.length > 0) {
            // const firstDate = availableDates[0]; // For example: "2024-09-27"
            const slots = slotsData[yyyymmdd].slots
                .map((slot, i) => i % 2 !== 0 && i !== 0 ? slot : null)
                .filter((slot) => slot !== null);
            console.log("Available slots for ${firstDate}:", slots);
            return res.status(200).send({
                results: [
                    {
                        toolCallId: toolCallId,
                        result: `The available slots for the given date are the following:
                     ${slots}. Recite the available slots to the user and ask them to choose one.`,
                    },
                ],
            });
        }
        else {
            console.log("No available dates");
            return res.status(404).send({
                results: [
                    {
                        toolCallId: toolCallId,
                        result: "No slots are available.",
                    },
                ],
            });
        }
    }
});
exports.checkAvailability = checkAvailability;
