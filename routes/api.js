import express from "express";
import bodyParser from "body-parser";
<<<<<<< HEAD
import * as StudentController from "../controllers/StudentController.js";
=======
>>>>>>> 4bf36d3d0e8284800a4739ac463e052c9de59c02

const apiRouter = express.Router();
apiRouter.use(bodyParser.json());

<<<<<<< HEAD
apiRouter.get('/', StudentController.getStudents);
=======
apiRouter.post("/student",);
>>>>>>> 4bf36d3d0e8284800a4739ac463e052c9de59c02


export default apiRouter;
