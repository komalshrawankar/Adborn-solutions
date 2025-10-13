// routes/blogRoutes.js
import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// ✅ Fetch all blogs OR search by query/category
router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // Search by title or description (case-insensitive)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category (enum)
    if (category && category !== "All Posts") {
      query.category = category;
    }

    const blogs = await Blog.find(query).sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

export default router;
