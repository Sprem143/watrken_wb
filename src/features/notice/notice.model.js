const mongoose = require('mongoose')
const noticeSchema= new mongoose.Schema({
   noticeWriter:{
    type:String,
    required:true
   },
   notice:{
    type:String,
    required:true
   },
   date:String
})

module.exports= mongoose.model('Notice', noticeSchema);