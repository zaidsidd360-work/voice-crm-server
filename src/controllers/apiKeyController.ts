import { Request, Response, NextFunction } from "express";
import { AuthRequest, ApiKeyResponse } from "../types";
import { BadRequestError, UnauthorizedError } from "../utils/errors";
import User from "../models/User";
import mongoose from "mongoose";

export const createApiKey = async (
	req: AuthRequest,
	res: Response<ApiKeyResponse>,
	next: NextFunction
): Promise<void> => {
	try {
		const { name, key, userId } = req.body;
		console.log(name, key, userId);

		// if (!name || !key) {
		// 	throw new BadRequestError("Please provide both name and key");
		// }

		const user = await User.findById(userId);
		if (!user) {
			throw new UnauthorizedError("User not found");
		}

		const apiKey = {
			_id: new mongoose.Types.ObjectId().toString(),
			name,
			key,
			createdAt: new Date(),
		};
		user.apiKeys.push(apiKey);
		await user.save();

		res.status(201).json({
			success: true,
			data: { apiKey },
		});
	} catch (error) {
		next(error);
	}
};

export const getApiKeys = async (
	req: AuthRequest,
	res: Response<ApiKeyResponse>,
	next: NextFunction
): Promise<void> => {
	try {
		const { userId } = req.params;
		console.log(userId);
		const user = await User.findById(userId);
		if (!user) {
			throw new UnauthorizedError("User not found");
		}

		res.status(200).json({
			success: true,
			data: { apiKeys: user?.apiKeys ?? [] },
		});
	} catch (error) {
		next(error);
	}
};

export const deleteApiKey = async (
	req: AuthRequest,
	res: Response<ApiKeyResponse>,
	next: NextFunction
): Promise<void> => {
	try {
		const { keyId } = req.params;
		const user = await User.findById(req.user?._id);

		if (!user) {
			throw new UnauthorizedError("User not found");
		}

		user.apiKeys = user.apiKeys.filter(
			(key) => key._id.toString() !== keyId
		);
		await user.save();

		res.status(200).json({
			success: true,
			data: { message: "API key deleted successfully" },
		});
	} catch (error) {
		next(error);
	}
};

export const updateApiKey = async (
	req: AuthRequest,
	res: Response<ApiKeyResponse>,
	next: NextFunction
): Promise<void> => {
	try {
		const { keyId } = req.params;
		const { name, key } = req.body;
		const user = await User.findById(req.user?._id);

		if (!user) {
			throw new UnauthorizedError("User not found");
		}

		const apiKey = user.apiKeys.find((key) => key._id.toString() === keyId);
		if (!apiKey) {
			throw new BadRequestError("API key not found");
		}

		if (name) apiKey.name = name;
		if (key) apiKey.key = key;

		await user.save();

		res.status(200).json({
			success: true,
			data: { apiKey },
		});
	} catch (error) {
		next(error);
	}
};
