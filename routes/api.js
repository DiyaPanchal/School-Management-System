import express from "express";
import bodyParser from "body-parser";
import * as StudentController from "../controllers/StudentController.js";
import * as TeacherController from "../controllers/TeacherController.js";
import * as ClassController from "../controllers/ClassController.js";

const apiRouter = express.Router();
apiRouter.use(bodyParser.json());

apiRouter.get('/students/', StudentController.getStudents);
apiRouter.post('/students/', StudentController.addStudent);
apiRouter.put('/students/:studentId', StudentController.updateStudent);
apiRouter.delete('/students/:studentId', StudentController.deleteStudent);
apiRouter.get("/teachers/", TeacherController.getTeachers);
apiRouter.post("/teachers/", TeacherController.addTeacher);
apiRouter.put("/teachers/:teacherId", TeacherController.updateTeacher);
apiRouter.delete("/teachers/:teacherId", TeacherController.deleteTeacher);
apiRouter.get('/classes/:classId', ClassController.getClass);
apiRouter.post('/classes/', ClassController.createClass);
apiRouter.put('/classes/:classId', ClassController.updateClass);
apiRouter.delete('/classes/:classId', ClassController.deleteClass);


export default apiRouter;
