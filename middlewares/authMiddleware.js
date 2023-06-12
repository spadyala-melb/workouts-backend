import { verifyToken } from "../utils/securityUtils.js";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization header is required" });
  }

  const token = authorization.split(" ")[1];

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Request is not authorized" });
  }

  const { _id } = decoded;
  req.user = await User.findOne({ _id }).select("_id");

  next();
};
