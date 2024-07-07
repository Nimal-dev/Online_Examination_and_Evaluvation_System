const express = require('express');
const router = express.Router();
const TeacherController = require('../Controllers/TeacherController');



router.post('/AddClass', TeacherController.AddClass);



module.exports = router;