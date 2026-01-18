import express from "express";
import { addXpController } from "../controllers/activityController.js";
import { getActivityController } from "../controllers/activityController.js";
import { getAllActivitiesController } from "../controllers/activityController.js";

const router = express.Router();

router.post("/activities/:id/xp", addXpController);
router.get("/activities/:id", getActivityController);
router.get("/activities", getAllActivitiesController);
export default router;