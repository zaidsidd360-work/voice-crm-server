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
