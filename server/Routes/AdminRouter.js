const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/AdminController');


router.post('/teacherRegister', adminController.teacherRegister);
router.post('/deleteTeacher', adminController.deleteTeacher);
router.get('/viewTeacher', adminController.viewTeacher);

module.exports = router;