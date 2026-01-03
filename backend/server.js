
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import userRoutes from "./routes/userRoutes.js";



dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("TailorHub Backend Running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
