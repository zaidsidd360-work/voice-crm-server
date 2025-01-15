import { Request, Response } from "express";
import Airtable from "airtable";

const base = new Airtable({
	apiKey: "patu3bTCvjKcj1dAH.232bd2feb82fe4be336fd4c10ccc7cc9a14d93485b799a61320f01f9ba1a33e2",
}).base("appFBqZs4uvwCGzkm");

export const sendDataToAirtable = async (req: Request, res: Response) => {
	const { name, email } = req.body.args;

	// console.log(req.body);
	console.log(name, email);

	if (!name || !email) {
		return res.status(400).json({ error: "Name and email are required" });
	}

	try {
		const record = await base("Lead").create({
			Name: name,
			Email: email,
			Phone: "(987) 563-9459",
			"Business Name": "New Corp",
		});

		res.status(200).json({
			message: "Data sent to Airtable successfully",
			record,
		});
	} catch (error) {
		console.error("Error sending data to Airtable:", error);
		res.status(500).json({ error: "Failed to send data to Airtable" });
	}
};
