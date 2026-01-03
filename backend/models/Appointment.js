import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  service: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  message: {
    type: String,
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Appointment", AppointmentSchema);
