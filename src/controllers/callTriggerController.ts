import { VapiClient } from "@vapi-ai/server-sdk";
import { Request, Response } from "express";

const client = new VapiClient({
	token: "27736a48-a784-4a11-a9e8-13402825c744",
});

export const callContact = async (req: Request, res: Response) => {
	console.log(req.body);
	const {
		contact_id,
		email,
		location: { id },
		full_name,
		phone,
	} = req.body;

	const details = {
		contactId: contact_id,
		email: email,
		calendarId: "7wKC1lBMjbMjMmH9x0eS",
		locationId: id,
		name: full_name,
	};

	console.log(details);

	await client.calls.create({
		assistantId: "84e1d53d-8caf-4f5a-bcc5-49f0e5e21ad4", // Helena
		assistantOverrides: {
			variableValues: {
				...details,
			},
		},
		phoneNumberId: "6de0381b-5828-48a3-a2d4-28575e039779",
		customer: {
			number: phone,
			name: full_name,
		},
	});
	return res.status(200).json({});
};
