const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Prem:Prem7366@cluster0.x2ajb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Database connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;


