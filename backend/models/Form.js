import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Form", formSchema);
