const mongoose = require('mongoose');

const studentAttendence= new mongoose.Schema({
    pStudent:{
        type:[Object],
        required: true
    },
    
    attendenceClass:{
        type:String,
        required:true
    },
    dateNow:{
        type:String,
        required:true
    },
    totalStudent:Number
},{timestamps:true});
module.exports = mongoose.model('Attendence', studentAttendence)