// Importing required models
const teachermodels = require('../Models/TeacherModel');
const authmodels = require('../Models/AuthModel');


// Creating instances of models
const teacherModel = teachermodels.teacher;
const authModel = authmodels.auth;


// Importing bcrypt library for password encryption
const bcrypt = require('bcrypt');

exports.teacherRegister = async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const authparam = {
            email: req.body.email,
            password: hashedPassword,
            usertype: req.body.usertype,
        };
        const auth = await authModel.create(authparam);

const teacherparam = {    
    teacherName: req.body.teacherName,
    subject: req.body.subject,
    contact: req.body.contact,
    location: req.body.location,
    address: req.body.address,
    authid: auth._id
};
        await teacherModel.create(teacherparam);
        res.json('success');
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.viewTeacher = async (req, res) => {
    try {
        const teachers = await teacherModel.find().populate('authid');
        res.json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteTeacher = async (req, res) => {
    try {
        const teacherId = req.body.id;
        const teacher = await teacherModel.findById(teacherId);

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher is not found' });
        }

        // Delete associated auth details
        await authModel.findByIdAndDelete(teacher.authid);

        // Delete the state
        await teacherModel.findByIdAndDelete(teacherId);

        res.json({ message: 'Teacher and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting Teacher:", error);
        res.status(500).json({ error: "An error occurred while deleting the Teacher" });
    }
};
