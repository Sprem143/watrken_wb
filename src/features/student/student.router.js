const express= require('express')
const router = express.Router();
const studentController = require('./student.controller.js')

router.post('/signin', studentController.signin);
// router.post('/getdata', studentController.getdata);
router.post('/verifytoken', studentController.verifytoken);
router.get('/logout', studentController.logout);

module.exports= router;