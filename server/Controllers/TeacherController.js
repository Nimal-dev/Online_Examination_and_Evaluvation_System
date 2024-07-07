const classmodels = require('../Models/ClassModel');
const teachermodels = require('../Models/TeacherModel');

const classModel = classmodels.classes;
const teacherModel = teachermodels.teacher;



exports.AddClass = async (req, res) => {
    try {

const classparam = {    
    classname: req.body.classname,
    teacherid: teacher._id
};
        await classModel.create(classparam);
        res.json('success');
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};