import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
