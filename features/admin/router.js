const express= require('express')
const router= express.Router();
const upload= require('../../upload')
const {signup, login, profile}= require('../admin/controller')

router.post('/signup', signup)
router.post('/login', login)
router.get('/profile', profile)

module.exports=router;