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
    pincode: Number,
    time: {
        type:String,
        default:new Date().toLocaleString()
    },
    status:{
        type:String,
        default:'Unshipped'
    }
});

module.exports = mongoose.model('Order', OrderSchema);
