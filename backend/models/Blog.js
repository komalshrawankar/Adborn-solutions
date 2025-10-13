// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "AI",
      "B2B",
      "Crypto",
      "Design",
      "Digital Marketing",
      "E-commerce",
      "Email",
      "Influencer Marketing",
      "PPC",
      "PR",
      "Real Estate",
      "SEO",
      "Social Media",
      "Video Production",
    ],
    required: true,
  },
  description: { type: String, required: true },
  date: { type: String, required: true },
  page: { type: String, required: true }, // e.g. "blog1.html"
});

export default mongoose.model("Blog", blogSchema);
