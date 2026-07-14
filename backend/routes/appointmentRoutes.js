import express from "express";
import Appointment from "../models/Appointment.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* ================= BOOK APPOINTMENT (CUSTOMER) ================= */
router.post("/", protect, async (req, res) => {
  try {
    const { provider, service, phone, date, message } = req.body;

    // 🔴 VALIDATION
    if (!provider || !service || !phone || !date) {
      return res.status(400).json({
        success: false,
        message: "All required fields are missing",
      });
    }

    const appointment = await Appointment.create({
      customer: req.user._id, // from JWT
      provider,
      service,
      phone,
      date,
      message,
    });

    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (err) {
    console.error("APPOINTMENT ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ================= PROVIDER: GET HIS APPOINTMENTS ================= */
router.get("/provider", protect, async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    const appointments = await Appointment.find({
      provider: req.user._id,
    }).populate("customer", "name email");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= PROVIDER: UPDATE STATUS ================= */
router.put("/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ success: true, appointment });
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
