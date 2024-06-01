import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use("/api", bookRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
