import Integration from "../models/Integration";

// Create Integration
export const createIntegration = async (req, res) => {
	try {
		const { userId, retellApiKey, vapiApiKey, airtableApiKey, ghlApiKey } =
			req.body;

		const existingIntegration = await Integration.findOne({ userId });
		if (existingIntegration) {
			return res.status(400).json({
				success: false,
				message: "Integration already exists",
			});
		}

		const integration = new Integration({
			userId,
			retellApiKey,
			vapiApiKey,
			airtableApiKey,
			ghlApiKey,
		});

		await integration.save();
		res.status(201).json({ success: true, integration });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Update Integration
export const updateIntegration = async (req, res) => {
	try {
		const { userId } = req.params;
		const { retellApiKey, vapiApiKey, airtableApiKey, ghlApiKey } =
			req.body;

		let integration = await Integration.findOne({ userId });

		if (!integration) {
			return res
				.status(404)
				.json({ success: false, message: "Integration not found" });
		}

		integration.retellApiKey = retellApiKey || integration.retellApiKey;
		integration.vapiApiKey = vapiApiKey || integration.vapiApiKey;
		integration.airtableApiKey =
			airtableApiKey || integration.airtableApiKey;
		integration.ghlApiKey = ghlApiKey || integration.ghlApiKey;

		await integration.save();
		res.status(200).json({ success: true, integration });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get Integration by User ID
export const getIntegration = async (req, res) => {
	try {
		const { userId } = req.params;
		const integration = await Integration.findOne({ userId });

		if (!integration) {
			return res
				.status(404)
				.json({ success: false, message: "Integration not found" });
		}

		res.status(200).json({ success: true, integration });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
