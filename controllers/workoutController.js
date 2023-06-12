import mongoose, { mongo } from "mongoose";
import Workout from "../models/workoutModel.js";
import { createWorkoutSchema } from "../validations/workoutsValidationSchemas.js";

// GET all workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  if (!workouts) {
    return res.status(400).json({ msg: "No workouts found" });
  }
  res.status(200).json(workouts);
};

// Create a new workout
const createWorkout = async (req, res) => {
  // Request validation
  const { error } = createWorkoutSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const { details } = error;
    return res.status(400).json({ error: details });
  }

  // Business Logic
  const { title, load, reps } = req.body;
  const user_id = req.user._id;
  // console.log("request: ", req);
  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//  GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "No such workout" });
  }

  const workout = await Workout.findById({ _id: id });
  if (!workout) {
    return res.status(400).json({ msg: "No such workout" });
  }

  res.status(200).json(workout);
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(400).json({ msg: "No such workout" });
  }

  res.status(200).json(workout);
};

//  Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(400).json({ msg: "No such workout" });
  }

  res.status(200).json(workout);
};

export {
  getAllWorkouts,
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
