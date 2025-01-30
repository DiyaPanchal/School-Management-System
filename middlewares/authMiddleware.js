import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);
    const secretKey = process.env.SECRET_KEY;
    const decodedToken = jwt.verify(token, secretKey);
    console.log(decodedToken);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};


export default authMiddleware;

