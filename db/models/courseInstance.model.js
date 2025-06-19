import mongoose from "mongoose";

const courseInstanceSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.String,
    ref: "Course",
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  semester: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
  }
});

export const CourseInstance = mongoose.model("CourseInstance", courseInstanceSchema);
