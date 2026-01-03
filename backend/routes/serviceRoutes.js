import express from "express";
import Service from "../models/Service.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* ADD SERVICE (PROVIDER ONLY) */
router.post("/", protect, async (req, res) => {
  try {
    console.log("USER:", req.user); // 🔥 DEBUG

    if (req.user.role !== "provider") {
      return res.status(403).json({
        message: "Only providers can add services",
      });
    }

    const service = await Service.create({
      provider: req.user._id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* GET MY SERVICES */
router.get("/my", protect, async (req, res) => {
  const services = await Service.find({ provider: req.user._id });
  res.json(services);
});

/* DELETE SERVICE */
router.delete("/:id", protect, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
