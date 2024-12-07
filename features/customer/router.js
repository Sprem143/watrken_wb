const express= require('express')
const router= express.Router();
const upload= require('../../upload')
const {cancelorder, changeaddress,changepassword, sendotp,verifyotp, signup, login, profile, uploadimg}= require('./controller');

router.post('/signup', signup)
router.post('/upload',upload.single('photo'),uploadimg)
router.post('/login', login)
router.get('/profile', profile);
router.put('/changepassword', changepassword);
router.put('/changeaddress', changeaddress);
router.post('/cancelorder', cancelorder)

module.exports=router;