const express = require('express')
const router = express.Router();

router.use('/director', require('./src/features/director/director.router'))
router.use('/student', require('./src/features/student/student.router'))
router.use('/teacher', require('./src/features/supplier/router'))
router.use('/notice', require('./src/features/notice/notice.router'))
module.exports = router;