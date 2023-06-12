import Joi from "joi";

// Request validation Schema's

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(25).required(),
});

export { loginUserSchema };
