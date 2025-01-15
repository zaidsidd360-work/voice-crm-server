import mongoose from "mongoose";

const { Schema, model } = mongoose;

const IntegrationSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	retellApiKey: {
		type: String,
		required: false,
	},
	vapiApiKey: {
		type: String,
		required: false,
	},
	airtableApiKey: {
		type: String,
		required: false,
	},
	ghlApiKey: {
		type: String,
		required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default model("Integration", IntegrationSchema);
