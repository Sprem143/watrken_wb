const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: Number,
    mobile: {
        type: Number,
    },
    address: {
        type: String,
        required: true
    },
    location: String,
    time: {
        type: String,
        default: new Date().toLocaleString()
    },
    status: {
        type: String,
        default: 'Unshipped'
    },
    seller: {
        type: String,
        default: ''
    },
    sellerid:String
},{timestamps:true});

module.exports = mongoose.model('Order', OrderSchema);
