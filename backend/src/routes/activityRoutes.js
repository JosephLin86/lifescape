import express from "express";
import { addXpController } from "../controllers/activityController.js";
import { getActivityController } from "../controllers/activityController.js";

const router = express.Router();

router.post("/activities/:id/xp", addXpController);
router.get("/activities/:id", getActivityController);

export default router;