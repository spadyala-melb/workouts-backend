import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import workoutRoutes from "./routes/workoutRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// middlewares
app.use(express.json()); //body parser
app.use(cors()); //cors

// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // web-server
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`WebServer listening on port ${process.env.SERVER_PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
