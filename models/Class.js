import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  assignedTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Class = mongoose.model("Class", classSchema);

export default Class;
