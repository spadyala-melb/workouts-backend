import User from "../models/userModel.js";
import {
  getHashed,
  comparePasswords,
  createToken,
} from "../utils/securityUtils.js";
import { loginUserSchema } from "../validations/userValidationSchemas.js";

// login
const login = async (req, res) => {
  // Validation
  const { error } = loginUserSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ error: error.details });
  }

  // Business Logic
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ msg: "Incorrect email" });
  }
  const match = await comparePasswords(password, user.password);
  if (!match) {
    return res.status(400).json({ msg: "Incorrect password" });
  }

  const token = createToken(user._id);
  res.status(200).json({ email, token });
};

// signup
const signup = async (req, res) => {
  const { email, password } = req.body;
  // Check the user already registered
  const exists = await User.findOne({ email: email });
  if (exists) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await getHashed(password);

  // Create a new user
  const user = await User.create({ email: email, password: hashedPassword });
  const token = createToken(user._id);

  res.status(200).json({ email, token });
};

export { login, signup };
