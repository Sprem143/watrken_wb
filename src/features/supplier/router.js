const express = require('express');
const router = express.Router();
const teacherController = require('./controller');

router.post('/signin', teacherController.signin);
router.post('/signup', teacherController.signup);
router.post('/logout', teacherController.logout);
router.get('/getallstudents', teacherController.getallstudents);
router.get('/loaddata', teacherController.loaddata);
router.post('/getonestudent', teacherController.getonestudent);
router.post('/addstudent', teacherController.addstudent);

module.exports = router;