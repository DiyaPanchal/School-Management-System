To implement the database operations and migrations for a School Management System in a MERN stack, you can use *MongoDB* (as your database) along with *Mongoose* (for interacting with MongoDB). Mongoose supports migrations through tools like *migrate-mongoose* or custom migration scripts. Here’s a step-by-step guide on how to implement database migrations and controllers for the above requirements.

### Step 1: Set Up Your Mongoose Models
You’ll need three primary models: `Student`, `Teacher`, and `Class`.

1. *Student Model* (`models/Student.js`):
js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  parentDetails: {
    fatherName: { type: String },
    motherName: { type: String },
    contactNumber: { type: String }
  }
});

module.exports = mongoose.model('Student', studentSchema);


2. *Teacher Model* (`models/Teacher.js`):
js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  contactNumber: { type: String }
});

module.exports = mongoose.model('Teacher', teacherSchema);


3. *Class Model* (`models/Class.js`):
js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  assignedTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Class', classSchema);


### Step 2: Set Up Migration Files

You can use *migrate-mongoose* or write your custom migration files. Below is an example of custom migration scripts.

1. **Install `migrate-mongoose` (optional)**:
bash
npm install migrate-mongoose


2. **Create Migrations Directory**:
bash
mkdir migrations


3. *Create Migration File for Initial Setup* (`migrations/2025-01-21-setup.js`):
js
const mongoose = require('mongoose');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Class = require('../models/Class');

module.exports = {
  up: async () => {
    // Creating initial teacher
    const teacher = new Teacher({
      name: 'Mr. John Doe',
      subject: 'Mathematics',
      contactNumber: '123-456-7890'
    });
    await teacher.save();

    // Creating initial class
    const classInfo = new Class({
      className: 'Class 10A',
      assignedTeacher: teacher._id
    });
    await classInfo.save();

    // Creating a sample student
    const student = new Student({
      name: 'Alice Smith',
      age: 15,
      class: classInfo._id,
      parentDetails: {
        fatherName: 'Mr. Smith',
        motherName: 'Mrs. Smith',
        contactNumber: '987-654-3210'
      }
    });
    await student.save();

    // Adding student to class
    classInfo.students.push(student._id);
    await classInfo.save();
  },
  
  down: async () => {
    // Clean up the database by removing the initial entries
    await Student.deleteMany({});
    await Class.deleteMany({});
    await Teacher.deleteMany({});
  }
};


### Step 3: Set Up Controllers
Next, you need controllers to handle the CRUD operations for students, teachers, and classes. Here's a basic example for the controllers.

1. *Student Controller* (`controllers/studentController.js`):
js
const Student = require('../models/Student');
const Class = require('../models/Class');

// Retrieve all students with pagination
exports.getStudents = async (req, res) => {
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

// Add a new student
exports.addStudent = async (req, res) => {
  const { name, age, classId, parentDetails } = req.body;
  try {
    const newStudent = new Student({
      name,
      age,
      class: classId,
      parentDetails
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

// Update student details
exports.updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const { name, age, classId, parentDetails } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { name, age, class: classId, parentDetails },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    await Student.findByIdAndDelete(studentId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


2. *Teacher Controller* (`controllers/teacherController.js`):
js
const Teacher = require('../models/Teacher');

// Retrieve all teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new teacher
exports.addTeacher = async (req, res) => {
  const { name, subject, contactNumber } = req.body;
  try {
    const newTeacher = new Teacher({ name, subject, contactNumber });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update teacher details
exports.updateTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const { name, subject, contactNumber } = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { name, subject, contactNumber },
      { new: true }
    );
    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
  const { teacherId } = req.params;
  try {
    await Teacher.findByIdAndDelete(teacherId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


3. *Class Controller* (`controllers/classController.js`):
js
const Class = require('../models/Class');

// Retrieve class details
exports.getClass = async (req, res) => {
  const { classId } = req.params;
  try {
    const classInfo = await Class.findById(classId)
      .populate('assignedTeacher')
      .populate('students');
    res.json(classInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new class
exports.createClass = async (req, res) => {
  const { className, teacherId } = req.body;
  try {
    const newClass = new Class({ className, assignedTeacher: teacherId });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update class details
exports.updateClass = async (req, res) => {
  const { classId } = req.params;
  const { className, teacherId } = req.body;
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { className, assignedTeacher: teacherId },
      { new: true }
    );
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete class
exports.deleteClass = async (req, res) => {
  const { classId } = req.params;
  try {
    await Class.findByIdAndDelete(classId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


### Step 4: Set Up Routes
Create routes for each controller method.

1. *Student Routes* (`routes/studentRoutes.js`):
js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getStudents);
router.post('/', studentController.addStudent);
router.put('/:studentId', studentController.updateStudent);
router.delete('/:studentId', studentController.deleteStudent);

module.exports = router;


2. *Teacher Routes* (`routes/teacherRoutes.js`):
js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.getTeachers);
router.post('/', teacherController.addTeacher);
router.put('/:teacherId', teacherController.updateTeacher);
router.delete('/:teacherId', teacherController.deleteTeacher);

module.exports = router;


3. *Class Routes* (`routes/classRoutes.js`):
js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/:classId', classController.getClass);
router.post('/', classController.createClass);
router.put('/:classId', classController.updateClass);
router.delete('/:classId', classController.deleteClass);

module.exports = router;


### Step 5: Initialize and Run the App

Finally, in your main `server.js` file, initialize the routes and connect to MongoDB:

js
const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/schoolDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/classes', classRoutes);

app.listen(3000, () => console.log('Server is running on port 3000'));


### Final Step: Running Migrations
Run the migrations (if using `migrate-mongoose`) or manually trigger the `up` functions in your migration files to populate the database.

This should set up the full structure for the School Management System with database migrations and CRUD operations for students, teachers, and classes.