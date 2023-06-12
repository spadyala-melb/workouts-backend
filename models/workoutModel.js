import mongoose from "mongoose";

// Define the schema
const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model from the schema
const Workout = mongoose.model("Workout", workoutSchema);

// Export the model
export default Workout;
