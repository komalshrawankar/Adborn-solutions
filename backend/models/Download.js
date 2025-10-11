import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  downloadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Download", downloadSchema);
