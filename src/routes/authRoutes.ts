import express from "express";
import { register } from "../controllers/authController";
import { login } from "../controllers/authController";
// import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
// router.get("/profile", authenticate, (req, res) => {
//     res.json({ message: "Protected route", user: req.user });
// });

export default router;
