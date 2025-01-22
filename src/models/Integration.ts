import mongoose from "mongoose";

const { Schema, model } = mongoose;

const IntegrationSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ["airtable", "gohighlevel"],
			required: true,
		},
		vapiApiKey: {
			type: String,
			required: true,
		},
		vapiToolId: {
			type: String,
			required: true,
		},
		// Airtable specific fields
		airtableToken: {
			type: String,
			required: function (this: { type: string }) {
				return this.type === "airtable";
			},
		},
		baseId: {
			type: String,
			required: function (this: { type: string }) {
				return this.type === "airtable";
			},
		},
		tableId: {
			type: String,
			required: function (this: { type: string }) {
				return this.type === "airtable";
			},
		},
		// GoHighLevel specific fields
		ghlApiKey: {
			type: String,
			required: function (this: { type: string }) {
				return this.type === "gohighlevel";
			},
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "inactive",
		},
	},
	{
		timestamps: true,
	}
);

export default model("Integration", IntegrationSchema);
