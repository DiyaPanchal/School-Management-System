import express from "express";
import bodyParser from "body-parser";
import * as StudentController from "../controllers/StudentController.js";
import * as TeacherController from "../controllers/TeacherController.js";
import * as ClassController from "../controllers/ClassController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const apiRouter = express.Router();
apiRouter.use(bodyParser.json());

apiRouter.get('/students/', authMiddleware, StudentController.getStudents);
apiRouter.post('/students/', StudentController.addStudent);
apiRouter.put('/students/:studentId', StudentController.updateStudent);
apiRouter.delete('/students/:studentId', authMiddleware, StudentController.deleteStudent);
apiRouter.get("/teachers/", authMiddleware, TeacherController.getTeachers);
apiRouter.post("/teachers/", authMiddleware, TeacherController.addTeacher);
apiRouter.put("/teachers/:teacherId", TeacherController.updateTeacher);
apiRouter.delete("/teachers/:teacherId", authMiddleware, TeacherController.deleteTeacher);
apiRouter.get('/classes/:classId', ClassController.getClass);
apiRouter.post('/classes/', authMiddleware, ClassController.createClass);
apiRouter.put('/classes/:classId', authMiddleware, ClassController.updateClass);
apiRouter.delete('/classes/:classId', authMiddleware, ClassController.deleteClass);


export default apiRouter;
