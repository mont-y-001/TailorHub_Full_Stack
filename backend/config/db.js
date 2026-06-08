import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    console.warn("Continuing without MongoDB — auth, services, and appointments will not work until DB is reachable.");
  }
};

export default connectDB;
