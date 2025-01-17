import { Request } from "express";

export interface UserDocument extends Document {
	_id: string; // Add this
	id: string; // Mongoose virtual
	name: string;
	email: string;
	password: string;
	role: "user" | "admin";
	refreshToken?: string;
	apiKeys: ApiKey[];
	comparePassword(candidatePassword: string): Promise<boolean>;
	createdAt: Date;
	updatedAt: Date;
}

export interface AuthRequest extends Request {
	user?: UserDocument;
}

export interface TokenPayload {
	userId: string;
}

export interface AuthResponse {
	success: boolean;
	data: {
		user?: {
			id: string;
			name: string;
			email: string;
			role: string;
		};
		accessToken?: string;
		refreshToken?: string;
	};
}

export interface ApiKey {
	_id: string;
	name: string;
	key: string;
	createdAt: Date;
	lastUsed?: Date;
}

export interface ApiKeyResponse {
	success: boolean;
	data: {
		apiKey?: ApiKey;
		apiKeys?: ApiKey[];
		message?: string;
	};
}
