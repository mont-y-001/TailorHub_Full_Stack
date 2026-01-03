import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* GET ALL PROVIDERS */
router.get("/providers", async (req, res) => {
  const providers = await User.find({ role: "provider" }).select("name");
  res.json(providers);
});

export default router;
