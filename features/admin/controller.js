const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const secretKey = process.env.SECURITY_KEY;
const Admin = require('./model')
const Order= require('../order/model')
exports.signup = async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let admin = new Admin({ mobile, password: hashedPassword });
        await admin.save();
        res.status(201).send("User created");
    } catch (err) {
        console.log(err)
    }
}

exports.login = async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const user =await Admin.findOne({ mobile: mobile })
        if (!user) {
            return res.status(401).send("User Not found");
        }
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({ mobile: user.mobile }, secretKey, { expiresIn: "1h" });
            res.json({ token });
        }
       
    } catch (err) {
        console.log(err)
    }
}

exports.profile = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).send("No token provided");
        const token = authHeader.split(" ")[1];
        try {
            const user = jwt.verify(token, secretKey);
            if(!user){
                res.status(404).send(false);
            }else{
                res.status(200).send(true)
            }
            
        } catch(err) {
            res.status(401).send("Invalid token");
        }
    } catch (err) {
        console.log(err)
    }
}

exports.getorder=async(req,res)=>{
    try{
   const orders= await Order.find();
   if(orders.length>0){
    res.status(200).json({order:orders, msg:""})
   }else{
    res.status(200).json({order:null, msg:"No Order Found"})
   }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}