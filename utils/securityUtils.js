import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getHashed = async (pwd) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pwd, salt);
  return hashedPassword;
};

const comparePasswords = async (password, dbPassword) => {
  const result = await bcrypt.compare(password, dbPassword);
  return result;
};

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const verifyToken = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("Failed to verify token:", error.message);
    return null;
  }
  return decoded;
};

export { getHashed, comparePasswords, createToken, verifyToken };
