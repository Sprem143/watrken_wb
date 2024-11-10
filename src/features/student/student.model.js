// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        // required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        requried:true
    },
    fatherName:{
        type:String,
        // required:true
    },
    class:{
        type:String,
        require:true
    },
    
    image:{
        type:String,
    },
    
    password:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    standard:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        require:true
    },
   attendance:{
    type:[Object],
    default:[{}],
   }

},{timestamps: true});

module.exports = mongoose.model('Student', userSchema);
