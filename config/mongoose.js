const mongoose = require('mongoose')
const connectDb = async() => {
    await mongoose.connect('mongodb+srv://Prem:Prem7366@cluster0.x2ajb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => console.log("MongDB connectd"))
        .catch(err => console.log(err))

}
module.exports = connectDb;