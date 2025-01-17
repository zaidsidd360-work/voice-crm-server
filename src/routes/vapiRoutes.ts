import express, { Router } from "express";
import { getTools } from "../controllers/vapiController";

const router: Router = express.Router();

router.get("/tools/:vapitoken", getTools);

export default router;
