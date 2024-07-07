const classmodels = require('../Models/ClassModel');
const studentmodels = require('../Models/StudentModel');
const authmodels = require('../Models/AuthModel');

const classModel = classmodels.classes;
const studentModel = studentmodels.student;
const authModel = authmodels.auth;

const bcrypt = require('bcrypt');


exports.AddClass = async (req, res) => {
    try {
        const classparam = {    
            classname: req.body.classname,
            teacherid: req.body.teacherId
        };
        await classModel.create(classparam);
        res.json('success');
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.ViewClasses = async (req, res) => {
    try {
        const teacherId = req.query.teacherId;
        const classes = await classModel.find({ teacherid: teacherId }).populate('teacherid');
        res.json(classes);
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.AddStudent = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const authparam = {    
            email: req.body.email,
      password: hashedPassword,
      usertype: req.body.usertype,
        };
        const auth = await authModel.create(authparam);
        
        const studentparam = {    
            studentName: req.body.studentName,
            classId: req.body.classId,
            admissionNumber: req.body.admissionNumber,
            authid: auth._id,
        };
        await studentModel.create(studentparam);
        res.json('success');
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.ViewStudents = async (req, res) => {
    try {
        const teacherId = req.query.teacherId;
        const classes = await classModel.find({ teacherid: teacherId });
        const classIds = classes.map(cls => cls._id);
        const students = await studentModel.find({ classId: { $in: classIds } }).populate('classId');
        res.json(students);
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

