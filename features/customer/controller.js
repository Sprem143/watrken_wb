const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const secretKey = process.env.SECURITY_KEY;
const Customer = require('./model');
const Order = require('../order/model')


exports.signup = async (req, res) => {
  try {
    const { name, mobile, address, pincode, location, imgurl, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let admin = new Customer({ name, mobile, address, pincode, location, imgurl, password: hashedPassword });
    await admin.save();
    res.status(201).json({ status: true })
  } catch (err) {
    res.send()
    console.log(err)
  }
}

exports.login = async (req, res) => {
  try {
    console.log('login')
    const { mobile, password } = req.body;
    const user = await Customer.findOne({ mobile: mobile });
    if (!user) {
      return res.status(401).send("User Not found");
    }
    // console.log(user)
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ mobile: user.mobile }, secretKey, { expiresIn: "1h" });
      res.json({ token });
    }

  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

exports.uploadimg = async (req, res) => {
  try {
    console.log(req.file.path)
    res.status(200).json({ url: req.file.path });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
}

exports.profile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send("No token provided");
    const token = authHeader.split(" ")[1];
    try {
      const user = jwt.verify(token, secretKey);
      let profile = await Customer.findOne({ mobile: user.mobile })
      res.status(200).send(profile);
    } catch (err) {
      res.status(401).send("Invalid token");
    }
  } catch (err) {
    console.log(err)
  }
}

exports.changepassword = async (req, res) => {
  try {
    const mobile = req.body.mobile
    const password = req.body.password;
    console.log(mobile, password)
    if (!mobile || !password) {
      return res.status(400).json({ message: "Mobile number and password are required." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let result = await Customer.findOneAndUpdate(
      { mobile: mobile },
      { $set: { password: hashedPassword } },
      { new: true }
    )
    if (result) {
      res.status(200).send("Password changes successfully")
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
}

exports.changeaddress = async (req, res) => {
  try {
    const mobile = req.body.mobile
    const address = req.body.address;
    const location = req.body.location;
    console.log(mobile, address, location)
    if (!mobile || !address || !location) {
      return res.status(400).json({ message: "Mobile number and password are required." });
    }
    let result = await Customer.findOneAndUpdate(
      { mobile: mobile },
      { $set: { address: address, location: location } },
      { new: true }
    )
    if (result) {
      res.status(200).send("Address changes successfully")
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
}

exports.cancelorder = async (req, res) => {
  try {
    const { id } = req.body;
    let result = await Order.findOneAndUpdate(
      { _id: id },
      { $set: { status: 'Cancelled' } },
      { new: true }
    )
    if(result){
      res.status(200).send("Order cancelled successfully")
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
}