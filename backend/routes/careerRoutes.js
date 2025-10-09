import express from "express";
import { submitCareerForm } from "../controllers/careerController.js";

const router = express.Router(); // ✅ Router instance

// POST /api/career
router.post("/", submitCareerForm);

export default router;
