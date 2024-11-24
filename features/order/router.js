const express= require('express')
const router= express.Router();
const {order,cancel,getorder}= require('./controller')

router.post('/order', order)
router.post('/cancel',cancel)
router.post('/getorder',getorder)
// router.get('/profile', profile)

module.exports=router;