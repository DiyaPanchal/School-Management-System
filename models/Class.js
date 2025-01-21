import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: false,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" },],
});

const Class = mongoose.model("Class", classSchema);

export default Class;
