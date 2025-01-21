import Class from "../models/Class.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

export const getClass = async (req, res) => {
  const { classId } = req.params;
  try {
    const classInfo = await Class.findById(classId)
      .populate("assignedTeacher")
      .populate("students");
    res.json(classInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createClass = async (req, res) => {
  const { className, teacherId } = req.body;
  try {
    const newClass = new Class({ className, assignedTeacher: teacherId });
    await newClass.save();
    res.json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  const { classId } = req.params;
  const { className, teacherId } = req.body;
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        className,
        assignedTeacher: teacherId,
      },
      { new: true }
    );
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  const { classId } = req.params;
  try {
    await Class.findByIdAndDelete(classId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
