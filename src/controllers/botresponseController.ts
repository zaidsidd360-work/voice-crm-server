import { Request, Response } from "express";
import Airtable from "airtable";

const base = new Airtable({
	apiKey: "patu3bTCvjKcj1dAH.14bdd086d57abbd25e028e8225211f1aca60f9ce95e0ce0526a47d19a4522379",
}).base("appFBqZs4uvwCGzkm");

export const sendDataToAirtable = async (req: Request, res: Response) => {
	const { message } = req.body;
	if (message.type === "tool-calls") {
		const vapiFn = message.toolCalls[0].function;
		try {
			const record = await base("Lead").create(vapiFn.arguments);
			console.log(record);
			return res.status(200).json({
				success: true,
				result: "Your data has been saved successfully.",
			});
		} catch (error) {
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
	} catch (error) {
		console.error("Error sending data to Airtable:", error);
		res.status(500).json({ error: "Failed to send data to Airtable" });
	}
};

export const sendDataToGoHighLevel = async (req: Request, res: Response) => {
	const { message } = req.body;
	if (message.type === "tool-calls") {
		const vapiFn = message.toolCalls[0].function;
		console.log(vapiFn.arguments);
		try {
			const response = await fetch(
				"https://services.leadconnectorhq.com/contacts/",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						Authorization:
							"Bearer pit-1d95f255-cbe9-47e5-8d29-5b9a529698d0",
						"Content-Type": "application/json",
						Version: "2021-07-28",
					},
					body: JSON.stringify({
						name: vapiFn.arguments.name,
						email: vapiFn.arguments.email,
						locationId: "ndfliIZ7QjE5bL6LUgVY",
						phone: vapiFn.arguments.phone,
					}),
				}
			);
			const data = await response.json();
			console.log(data);
			return res.status(200).json({
				success: true,
				result: "Your data has been saved successfully.",
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ result: "Failed to save your data." });
		}
	}
};
