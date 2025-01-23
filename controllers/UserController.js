import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY;

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user.", error });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found." });

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    function isPasswordValid() {
        if(password == user.password) return true;
    };

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in user.", error });
  }
}
