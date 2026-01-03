import express from "express";
import Appointment from "../models/Appointment.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* ---------------- CUSTOMER: BOOK APPOINTMENT ---------------- */
router.post("/", protect, async (req, res) => {
  try {
    const { provider, service, phone, date, message } = req.body;

    const appointment = await Appointment.create({
      customer: req.user._id,
      provider,
      service,
      phone,
      date,
      message,
    });

    res.status(201).json({ success: true, appointment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ---------------- PROVIDER: GET HIS APPOINTMENTS ---------------- */
router.get("/provider", protect, async (req, res) => {
  if (req.user.role !== "provider") {
    return res.status(403).json({ message: "Access denied" });
  }

  const appointments = await Appointment.find({
    provider: req.user._id,
  }).populate("customer", "name email");

  res.json(appointments);
});

/* ---------------- PROVIDER: UPDATE STATUS ---------------- */
router.put("/:id", protect, async (req, res) => {
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
});

export default router;
