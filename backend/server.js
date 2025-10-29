import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import formRoutes from "./routes/formRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import subscribeRoute from "./routes/subscribe.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB (if you want to store form data)
connectDB();

// Routes
app.use("/api/forms", formRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/subscribe", subscribeRoute);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
