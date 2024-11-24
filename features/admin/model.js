const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

  mobile:{
    type:Number,
    required:true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Admin', UserSchema);
