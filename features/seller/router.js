const express= require('express')
const router= express.Router();
const upload= require('../../upload')
const {getdeliveredorder, getyourorder,changestatus, signup, login, profile, uploadimg, getorder}= require('./controller')

router.post('/signup', signup)
router.post('/upload',upload.single('photo'),uploadimg)
router.post('/login', login)
router.get('/profile', profile)
router.get('/getorder',getorder)
router.put('/changestatus',changestatus)
router.post('/getyourorder',getyourorder)
router.post('/getdeliveredorder',getdeliveredorder)

module.exports=router;