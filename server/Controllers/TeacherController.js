const classmodels = require('../Models/ClassModel');
const studentmodels = require('../Models/StudentModel');
const authmodels = require('../Models/AuthModel');
const examModels = require('../Models/ExamModel');


const classModel = classmodels.classes;
const studentModel = studentmodels.student;
const authModel = authmodels.auth;
const examModel = examModels.exam;

const bcrypt = require('bcrypt');

// --------------Add Classes and View Added Classes --------------------//
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
// --------------Add Classes and View Added Classes END --------------------//


// --------------Add Students and View Added Students START --------------------//
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
// --------------Add Students and View Added Students END --------------------//


// --------------Add Exam and View Added Exams Start --------------------//

exports.AddExam = async (req, res) => {
    try {
      const examParam = {
        examName: req.body.examName,
        classId: req.body.classId,
        dateOfExam: req.body.dateOfExam,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        questions: req.body.questions,
        teacherId: req.body.teacherId,
      };
      await examModel.create(examParam);
      res.json('success');
    } catch (error) {
      console.error("Error Occurred:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.ViewExams = async (req, res) => {
    try {
      const teacherId = req.query.teacherId;
      const exams = await examModel.find({ teacherId }).populate('classId');
      res.json(exams);
    } catch (error) {
      console.error("Error Occurred:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.GetStudentAnswers = async (req, res) => {
    try {
      const examId = req.query.examId;
      const exam = await examModel.findById(examId).populate('studentAnswers.studentId');
      res.json(exam.studentAnswers);
    } catch (error) {
      console.error("Error Occurred:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.UpdateStudentMarks = async (req, res) => {
    try {
      const { examId, studentId, marks } = req.body;
      const exam = await examModel.findById(examId);
      const studentAnswer = exam.studentAnswers.find(sa => sa.studentId.toString() === studentId);
      if (studentAnswer) {
        studentAnswer.marks = marks;
        await exam.save();
        res.json('success');
      } else {
        res.status(404).json({ error: 'Student answer not found' });
      }
    } catch (error) {
      console.error("Error Occurred:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


// --------------Add Exam and View Added Exams End --------------------//