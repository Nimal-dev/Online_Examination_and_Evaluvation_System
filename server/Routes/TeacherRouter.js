const express = require('express');
const router = express.Router();
const TeacherController = require('../Controllers/TeacherController');



router.post('/AddClass', TeacherController.AddClass);


router.get('/classes', TeacherController.ViewClasses);

router.post('/AddStudent', TeacherController.AddStudent);
router.get('/students', TeacherController.ViewStudents);

router.post('/AddExam', TeacherController.AddExam);
router.get('/exams', TeacherController.ViewExams);
router.get('/GetStudentAnswers', TeacherController.GetStudentAnswers);
router.post('/UpdateStudentMarks', TeacherController.UpdateStudentMarks);


module.exports = router;