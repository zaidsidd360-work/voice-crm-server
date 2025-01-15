import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Customer } from "../models/Customer";
import jwt from "jsonwebtoken";

const JWT_SECRET = "jwt-secret-key";

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const customer = await Customer.findOne({ email });
		if (!customer) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			customer.passwordHash
		);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ id: customer._id }, JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(200).json({
			message: "Login successful",
			token,
			user: customer,
		});
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	try {
		const existingCustomer = await Customer.findOne({ email });
		if (existingCustomer) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const customer = new Customer({
			fullName: name,
			email,
			passwordHash: hashedPassword,
		});

		await customer.save();

		res.status(201).json({
			message: "User registered successfully",
			user: customer,
		});
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};
