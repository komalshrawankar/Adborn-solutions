import mongoose from "mongoose";

const careerFormSchema = new mongoose.Schema({
  position: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  resumeLink: { type: String, required: true },
  portfolioLink: { type: String },
  test: { type: String, required: true },
  salary: { type: String, required: true },
  availability: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const CareerForm = mongoose.model("CareerForm", careerFormSchema);
export default CareerForm;
