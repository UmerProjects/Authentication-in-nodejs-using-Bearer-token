import mongoose from "mongoose";

const postByUser = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required to continue the process",
    max: 150,
  },
  message: {
    type: String,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("post", postByUser);
