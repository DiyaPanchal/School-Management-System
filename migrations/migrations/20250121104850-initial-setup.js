import Teacher from "../../models/Teacher.js";
import Student from "../../models/Student.js";
import Class from "../../models/Class.js";

export async function up() {
  const teacher = new Teacher({
    teacherName: "Payal Nayak",
    subject: "Mathematics",
    contactNumber: "1234567890",
  });
  await teacher.save();

  const classInfo = new Class({
    className: "Class 10A",
    assignedTeacher: teacher._id,
  });
  await classInfo.save();

  const student = new Student({
    name: "Diya Panchal",
    age: 22,
    class: classInfo._id,
    parentDetails: {
      fatherName: "Mr. Panchal",
      motherName: "Mrs. Panchal",
      contactNumber: "7876543210",
    },
  });
  await student.save();

  classInfo.students.push(student._id);
  await classInfo.save();
}

export async function down() {
  await Student.deleteMany({});
  await Class.deleteMany({});
  await Teacher.deleteMany({});
}
