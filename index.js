const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const adminRouter= require('./features/admin/router');
const sellerRouter= require('./features/seller/router');
const customerRouter= require('./features/customer/router');
const orderRouter= require('./features/order/router')
const nodemailer = require('nodemailer');

const app = express();
connectDB();

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin',adminRouter);
app.use('/seller',sellerRouter);
app.use('/customer',customerRouter);
app.use('/order',orderRouter);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
