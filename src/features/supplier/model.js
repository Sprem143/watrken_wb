const mongoose = require('mongoose')
const supplierSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
        require: true,
        unique: true
    },
    address: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        requrie: true
    },
    fatherName: {
        type: String,
        require: true
    },
    image: {
        type: String,
        // require: true
    },
    document: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    // adhar: {
    //     type: String,
    //     require: true
    // }
}, { timestamps: true })
module.exports = mongoose.model('Supplier', supplierSchema);