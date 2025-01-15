import mongoose, { Schema, Document } from "mongoose";

export enum UserType {
	BASE = "base",
	CONTRACTOR = "contractor",
	WHOLESALER = "wholesaler",
	CUSTOMER = "customer",
	PLATFORM_ADMIN = "platform_admin",
}

export interface IBaseUser extends Document {
	id: string;
	email: string;
	passwordHash: string;
	phone?: string;
	address?: string;
	isActive: boolean;
	type: UserType;
	createdAt: Date;
	updatedAt: Date;
}

const BaseUserSchema = new Schema<IBaseUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: false,
		},
		address: {
			type: String,
			required: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		type: {
			type: String,
			enum: Object.values(UserType),
			default: UserType.BASE,
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields automatically
	}
);

export const BaseUser = mongoose.model<IBaseUser>("BaseUser", BaseUserSchema);
