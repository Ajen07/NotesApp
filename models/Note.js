import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the note"],
      trim: true,
      minlength: [3, "Title length cannot be less than 3 characters"],
      maxlength: [50, "Title length cannot be more than 50 characters"],
    },
    body: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notes", NoteSchema);
