import express from "express";
import bodyParser from "body-parser";
import * as StudentController from "../controllers/StudentController.js";

const apiRouter = express.Router();
apiRouter.use(bodyParser.json());

apiRouter.get('/', StudentController.getStudents);


export default apiRouter;
