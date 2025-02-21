import { VapiClient } from "@vapi-ai/server-sdk";
import { Request, Response } from "express";
import Retell from "retell-sdk";

const client = new VapiClient({
	token: "27736a48-a784-4a11-a9e8-13402825c744",
});

const clientRetell = new Retell({
  apiKey: 'key_cd61799a58c48c29f6ccbf3809e2',
});

export const callContactRetell = async (req: Request, res: Response) => {
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
    number: phone
	};

  console.log(details)

  await clientRetell.call.createPhoneCall({ 
    override_agent_id: 'agent_04955c70e3834215fd9b4595d2',
    from_number: '+12176451767',
    to_number: phone,
    retell_llm_dynamic_variables: {
      ...details
    }
   });
}

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
