import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument } from "../types";

interface UserModel extends Model<UserDocument> {
	build(attrs: UserDocument): UserDocument;
}

const apiKeySchema = new Schema({
	name: {
		type: String,
		required: [true, "Please provide a name for the API key"],
		trim: true,
	},
	key: {
		type: String,
		required: [true, "Please provide an API key value"],
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	lastUsed: {
		type: Date,
	},
});

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide a name"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please provide an email"],
			unique: true,
			lowercase: true,
			match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minlength: 6,
			select: false,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		refreshToken: String,
		apiKeys: [apiKeySchema],
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
