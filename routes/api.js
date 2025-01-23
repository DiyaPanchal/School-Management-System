import express from "express";
import bodyParser from "body-parser";
import * as StudentController from "../controllers/StudentController.js";
import * as TeacherController from "../controllers/TeacherController.js";
import * as ClassController from "../controllers/ClassController.js";
import * as UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAuthorizedMiddleware from "../middlewares/isAuthorizedMiddleware.js";

const apiRouter = express.Router();
apiRouter.use(bodyParser.json());


apiRouter.post('/signup', UserController.signup);
apiRouter.post('/login', UserController.login);
apiRouter.get(
  "/students/",
  authMiddleware, isAuthorizedMiddleware,
  StudentController.getStudents
);
apiRouter.post('/students/', authMiddleware, StudentController.addStudent);
apiRouter.put(
  "/students/:studentId",
  authMiddleware, StudentController.updateStudent
);
apiRouter.delete(
  "/students/:studentId",
  authMiddleware, isAuthorizedMiddleware,
  StudentController.deleteStudent
);
apiRouter.get("/teachers/", authMiddleware, isAuthorizedMiddleware, TeacherController.getTeachers);
apiRouter.post(
  "/teachers/",
  authMiddleware, isAuthorizedMiddleware,
  TeacherController.addTeacher
);
apiRouter.put(
  "/teachers/:teacherId",
  authMiddleware, TeacherController.updateTeacher
);
apiRouter.delete(
  "/teachers/:teacherId",
  authMiddleware,isAuthorizedMiddleware,
  TeacherController.deleteTeacher
);
apiRouter.get('/classes/:classId', authMiddleware, ClassController.getClass);
apiRouter.post('/classes/', authMiddleware, isAuthorizedMiddleware, ClassController.createClass);
apiRouter.put(
  "/classes/:classId",
  authMiddleware, isAuthorizedMiddleware,
  ClassController.updateClass
);
apiRouter.delete('/classes/:classId',authMiddleware, isAuthorizedMiddleware, ClassController.deleteClass);


export default apiRouter;
