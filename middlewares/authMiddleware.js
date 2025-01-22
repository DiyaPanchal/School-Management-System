import Teacher from "../models/Teacher";

const authMiddleware = async(req, res, next) => {
    const {teacherId} = req.body;
    const teacher = await Teacher.findById(teacherId);
    if(!teacher || teacher.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
        next();
};

export default authMiddleware;

