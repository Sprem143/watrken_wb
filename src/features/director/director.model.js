const mongoose = require('mongoose')

const directorModel = new mongoose.Schema({
    // username:{
    //     type:String,
    //     unique:true,
    //     required:true
    // },
    // email:{
    //     type:String,
    //     unique:true,
    //     required:true
    // },
    name: { type: String, default: 'Admin' },
    mobile: { type: Number, required: true },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Director', directorModel)