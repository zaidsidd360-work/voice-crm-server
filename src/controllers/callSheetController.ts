import { Request, Response } from "express";
import { VapiClient } from "@vapi-ai/server-sdk";

const client = new VapiClient({
	token: "27736a48-a784-4a11-a9e8-13402825c744",
});

// Delay helper function
const delay = (minutes: number) =>
	new Promise((resolve) => setTimeout(resolve, minutes * 60 * 1000));

export const callContacts = async (req: Request, res: Response) => {
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
				await client.calls.create({
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
					await delay(frequency);
				}
			} catch (err) {
				console.error(
					`Failed to schedule call for ${contact["Name"]}:`,
					err
				);
			}
		}
	} catch (error) {
		console.error("Error processing call sheet:", error);
	}
};
