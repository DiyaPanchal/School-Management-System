import Teacher from "../models/Teacher.js";

export const getTeachers = async (req, res) => {
    try{
        const teachers = await Teacher.find();
        res.json(teachers);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const addTeacher = async(req, res) => {
    const {teacherName, subject, contactNumber} = req.body;
    const newTeacher = new Teacher({
        teacherName,
        subject,
        contactNumber
    });
    try{
        await newTeacher.save();
        res.json(newTeacher);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const updateTeacher = async(req, res) =>{
    const {teacherId} = req.params;
    const {teacherName, subject, contactNumber} = req.body;
    try{
        const updatedTeacher = await Teacher.findByIdAndUpdate(
          teacherId,
          {
            teacherName,
            subject,
            contactNumber,
          },
          { new: true }
        );
        res.json(updatedTeacher);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }

};

export const deleteTeacher = async(req, res) => {
    const {teacherId} = req.params;
    try{
        await Teacher.findByIdAndDelete(teacherId);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};