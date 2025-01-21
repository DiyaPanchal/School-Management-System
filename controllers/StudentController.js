import Student from "../models/Student.js";
import Class from "../models/Class.js";

export const getStudents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const students = await Student.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('class');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStudents = async (req, res) => {
  const { name, age, classId, parentDetails } = req.body;
  try {
    const newStudent = new Student({
      name,
      age,
      class: classId,
      parentDetails,
    });
    await newStudent.save();

    const classInfo = await Class.findById(classId);
    classInfo.students.push(newStudent._id);
    await classInfo.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
