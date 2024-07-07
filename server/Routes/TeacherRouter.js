const express = require('express');
const router = express.Router();
const TeacherController = require('../Controllers/TeacherController');



router.post('/AddClass', TeacherController.AddClass);


router.get('/classes', TeacherController.ViewClasses);

router.post('/AddStudent', TeacherController.AddStudent);
router.get('/students', TeacherController.ViewStudents);


module.exports = router;