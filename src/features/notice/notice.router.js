const express= require('express');
const router= express.Router();
const noticeController= require('./notice.controller.js');

router.get('/getnotice', noticeController.getnotice);
router.post('/addnotice', noticeController.addnotice);
router.delete('/deletenotice',noticeController.deletenotice);

module.exports=router;