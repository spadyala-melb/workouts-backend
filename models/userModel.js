import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model from the schema
const User = mongoose.model("User", userSchema);

// Export the model
export default User;
