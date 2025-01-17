import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload, AuthResponse, AuthRequest } from "../types";
import { BadRequestError, UnauthorizedError } from "../utils/errors";
import User from "../models/User";

const generateTokens = (
	userId: string
): { accessToken: string; refreshToken: string } => {
	const accessToken = jwt.sign(
		{ userId } as TokenPayload,
		process.env.JWT_SECRET ?? "secret",
		{ expiresIn: "15m" }
	);

	const refreshToken = jwt.sign(
		{ userId } as TokenPayload,
		process.env.JWT_REFRESH_SECRET ?? "refresh_secret",
		{ expiresIn: "7d" }
	);

	return { accessToken, refreshToken };
};

interface RegisterRequestBody {
	name: string;
	email: string;
	password: string;
}

// ------ Register User ------
export const register = async (
	req: Request<{}, {}, RegisterRequestBody>,
	res: Response<AuthResponse>,
	next: NextFunction
): Promise<void> => {
	try {
		const { name, email, password } = req.body;

		console.log(name, email, password);

		const userExists = await User.findOne({ email });
		if (userExists) {
			throw new BadRequestError("User already exists");
		}

		const user = await User.create({
			name,
			email,
			password,
		});

		const userId = user._id.toString();

		const { accessToken, refreshToken } = generateTokens(userId);

		user.refreshToken = refreshToken;
		await user.save();

		res.status(201).json({
			success: true,
			data: {
				user: {
					id: userId,
					name: user.name,
					email: user.email,
					role: user.role,
				},
				accessToken,
				refreshToken,
			},
		});
	} catch (error) {
		next(error);
	}
};

interface LoginRequestBody {
	email: string;
	password: string;
	role: string;
}

// ------ Login User ------
export const login = async (
	req: Request<{}, {}, LoginRequestBody>,
	res: Response<AuthResponse>,
	next: NextFunction
): Promise<void> => {
	try {
		const { email, password, role } = req.body;

		if (!email || !password) {
			throw new BadRequestError("Please provide email and password");
		}

		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			throw new UnauthorizedError("Not a registered user");
		}
		const userId = user._id.toString();

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			throw new UnauthorizedError("Incorrect password");
		}

		if (role === "admin" && user.role === "user") {
			throw new UnauthorizedError(
				"Can't login as admin, please select the user role"
			);
		}

		const { accessToken, refreshToken } = generateTokens(userId);

		user.refreshToken = refreshToken;
		await user.save();

		res.status(200).json({
			success: true,
			data: {
				user: {
					id: userId,
					name: user.name,
					email: user.email,
					role: user.role,
				},
				accessToken,
				refreshToken,
			},
		});
	} catch (error) {
		next(error);
	}
};

interface RefreshTokenRequestBody {
	refreshToken: string;
}

// ------ Refresh Token ------
export const refreshToken = async (
	req: Request<{}, {}, RefreshTokenRequestBody>,
	res: Response<AuthResponse>
): Promise<void> => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		throw new UnauthorizedError("Refresh token is required");
	}

	try {
		const decoded = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET!
		) as TokenPayload;

		const user = await User.findById(decoded.userId);

		if (!user || user.refreshToken !== refreshToken) {
			throw new UnauthorizedError("Invalid refresh token");
		}

		const userId = user._id.toString();

		const tokens = generateTokens(userId);

		user.refreshToken = tokens.refreshToken;
		await user.save();

		res.status(200).json({
			success: true,
			data: {
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
			},
		});
	} catch (error) {
		throw new UnauthorizedError("Invalid refresh token");
	}
};

// ------ Logout User ------
export const logout = async (
	req: AuthRequest,
	res: Response<AuthResponse>,
	next: NextFunction
): Promise<void> => {
	try {
		if (!req.user) {
			throw new UnauthorizedError("Not authorized");
		}

		const user = await User.findById(req.user._id);
		if (user) {
			user.refreshToken = undefined;
			await user.save();
		}

		res.status(200).json({
			success: true,
			data: {},
		});
	} catch (error) {
		next(error);
	}
};
