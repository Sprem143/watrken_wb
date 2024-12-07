const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
  mobile:{
    type:Number,
    required:true,
    unique:true,
  },
  address:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
  pincode:Number,
  imgurl:String,
  location:String
});

module.exports = mongoose.model('Customer', UserSchema);
