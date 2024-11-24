const express= require('express')
const router= express.Router();
const upload= require('../../upload')
const {signup, login, profile, uploadimg}= require('./controller')

router.post('/signup', signup)
router.post('/upload',upload.single('photo'),uploadimg)
router.post('/login', login)
router.get('/profile', profile)

module.exports=router;