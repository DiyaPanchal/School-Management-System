import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  parentDetails: {
    fatherName: { type: String },
    motherName: { type: String },
    contactNumber: { type: String },
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
