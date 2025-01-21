import express from "express";
import bodyParser from "body-parser";
import * as StudentController from "../controllers/StudentController.js";
import * as TeacherController from "../controllers/TeacherController.js";

const apiRouter = express.Router();
apiRouter.use(bodyParser.json());

apiRouter.get('/', StudentController.getStudents);
apiRouter.post('/', StudentController.addStudent);
apiRouter.put('/:studentId', StudentController.updateStudent);
apiRouter.delete('/:studentId', StudentController.deleteStudent);
apiRouter.get("/", TeacherController.getTeachers);
apiRouter.post("/", TeacherController.addTeacher);
apiRouter.put("/:teacherId", TeacherController.updateTeacher);
apiRouter.delete("/:teacherId", TeacherController.deleteTeacher);


export default apiRouter;
