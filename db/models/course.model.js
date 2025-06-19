import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  prerequisites: [{
    type: String, 
    ref: "Course"
  }]
});

export const Course = mongoose.model("Course", courseSchema);
