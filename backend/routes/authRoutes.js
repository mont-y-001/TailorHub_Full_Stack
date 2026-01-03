import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

/* ===================== REGISTER ===================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with role
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === "provider" ? "provider" : "user",
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* ===================== LOGIN ===================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Match password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRET123",
      { expiresIn: "7d" }
    );

    // 🔥 VERY IMPORTANT: SEND ROLE TO FRONTEND
    res.json({
      success: true,
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
