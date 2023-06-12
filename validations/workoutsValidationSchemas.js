import Joi from "joi";

// Request validation Schema's

const createWorkoutSchema = Joi.object({
  title: Joi.string().required(),
  load: Joi.number().integer().required(),
  reps: Joi.number().integer().required(),
});

export { createWorkoutSchema };
