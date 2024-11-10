const mongoose = require('mongoose')
const teacherSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobile:{
        type:Number,
        require:true,
        unique:true
    },
    address:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        requrie:true
    },
    fatherName:{
        type:String,
        require:true
    },
    qualification:String,
    
    image:{
        type:String,
        require:true
    },
    
    password:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    
cookie:String

},{timestamps: true})
module.exports = mongoose.model('Teacher', teacherSchema);

 