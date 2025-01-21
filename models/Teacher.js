import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    subject:{
        type:String,
        required: true
    },
    experience:{
        type:Number,
        required: false
    },
    
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;