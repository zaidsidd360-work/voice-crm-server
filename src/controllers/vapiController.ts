import { VapiClient } from "@vapi-ai/server-sdk";
import { Request, Response, NextFunction } from "express";

export const getTools = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { vapitoken } = req.params;
	const client = new VapiClient({ token: vapitoken });
	const data = await client.tools.list();
	console.log(data);
	res.json(data);
};
