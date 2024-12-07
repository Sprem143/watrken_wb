const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const secretKey = process.env.SECURITY_KEY;
const Seller = require('./model')
const Order = require('../order/model');
exports.signup = async (req, res) => {
    try {
        const { name, mobile,email, address, adhar, password, imgurl, adharurl } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let admin = new Seller({ name, mobile,email, address, adhar, password: hashedPassword, imgurl, adharurl });
        await admin.save();
        res.status(201).json({ status: true })
    } catch (err) {
        res.send()
        console.log(err)
    }
}

exports.login = async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const user = await Seller.findOne({ mobile: mobile });
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
            let profile = await Seller.findOne({ mobile: user.mobile })
            res.status(200).send(profile);
        } catch (err) {
            res.status(401).send("Invalid token");
        }
    } catch (err) {
        console.log(err)
    }
}

exports.getorder = async (req, res) => {
    try {
        const unshippedorders = await Order.find({status:"Unshipped"});
        if (unshippedorders.length > 0) {
            res.status(200).json({ order: unshippedorders, msg: "" })
        } else {
            res.status(200).json({ order: null, msg: "No Order Found" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.changestatus = async (req, res) => {
    try {
        const { id, sellerid, value, seller } = req.body;
        let result = await Order.findOneAndUpdate(
            { _id: id },
            { $set: { status: value, seller: seller, sellerid: sellerid } },
            { new: true }
        );
        if (result) {
            res.status(200).json({ msg: "Status updated" });
        } else {
            return res.status(404).json({
                msg: 'Order not found.'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err })
    }
}

exports.getyourorder = async (req,res) => {
    try {
        const { sellerid } = req.body;
        let orders = await Order.find({ sellerid: sellerid });
        res.status(200).send(orders)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.getdeliveredorder = async(req,res)=>{
    try{
        const { sellerid } = req.body;
        let orders = await Order.find({ sellerid: sellerid });
        let del_order= orders.filter((order)=> order.status==='Delivered')
        res.status(200).send(del_order);
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}