import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
  position: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
  phone: String,
  email: { type: String, required: true },
  resumeLink: { type: String, required: true },
  portfolioLink: String,
  test: { type: String, required: true },
  salary: String,
  availability: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Career", careerSchema);
