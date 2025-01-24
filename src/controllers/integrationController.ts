import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import Integration from "../models/Integration";
import { BadRequestError, UnauthorizedError } from "../utils/errors";
import User from "../models/User";

export const createIntegration = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userId, name, type, vapiToolId, baseId, tableId, ghlApiKey } =
			req.body;

		if (!name || !type || !vapiToolId) {
			throw new BadRequestError("Missing required fields");
		}

		// if(type === "gohighlevel") {
		//   const ghlApiKey = User.findOne({ _id: userId }).select("apiKeys")[type];
		// }

		const integration = await Integration.create({
			userId,
			name,
			type,
			vapiToolId,
			...(type === "airtable" && { baseId, tableId }),
			...(type === "gohighlevel" && { ghlApiKey }),
		});

		res.status(201).json({
			success: true,
			data: integration,
		});
	} catch (error) {
		next(error);
	}
};

export const getIntegrations = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userId } = req.params;
		const integrations = await Integration.find({ userId });

		res.status(200).json({
			success: true,
			data: integrations,
		});
	} catch (error) {
		next(error);
	}
};

export const getIntegration = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const integration = await Integration.findOne({
			_id: id,
			userId: req.user?._id,
		});

		if (!integration) {
			throw new BadRequestError("Integration not found");
		}

		res.status(200).json({
			success: true,
			data: integration,
		});
	} catch (error) {
		next(error);
	}
};

export const updateIntegration = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		const integration = await Integration.findOne({
			_id: id,
			userId: req.user?._id,
		});

		if (!integration) {
			throw new BadRequestError("Integration not found");
		}

		const updatedIntegration = await Integration.findByIdAndUpdate(
			id,
			{ ...updates },
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			success: true,
			data: updatedIntegration,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteIntegration = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const integration = await Integration.findOne({
			_id: id,
			userId: req.user?._id,
		});

		if (!integration) {
			throw new BadRequestError("Integration not found");
		}

		await Integration.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			data: null,
		});
	} catch (error) {
		next(error);
	}
};
