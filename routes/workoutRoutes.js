import express from "express";
import {
  getAllWorkouts,
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// configure middleware for authentication
router.use(authMiddleware);

router.get("/", getAllWorkouts);
router.post("/", createWorkout);
router.get("/:id", getWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

export default router;
