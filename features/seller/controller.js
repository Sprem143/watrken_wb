const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const secretKey = process.env.SECURITY_KEY;
const Seller = require('./model')

exports.signup = async (req, res) => {
    try {
        const {name, mobile,address,adhar, password, imgurl,adharurl } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let admin = new Seller({name, mobile,address,adhar,password:hashedPassword,imgurl, adharurl });
        await admin.save();
        res.status(201).json({status:true})
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
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({ mobile: user.mobile }, secretKey, { expiresIn: "1h" });
            res.json({token});
        }
       
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

exports.uploadimg=async(req,res)=>{
    try{
        res.status(200).json({ url: req.file.path }); 
    }catch(err){
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
            let profile= await Seller.findOne({mobile:user.mobile})
            console.log(profile)
            res.status(200).send(profile);
        } catch(err) {
            res.status(401).send("Invalid token");
        }
    } catch (err) {
        console.log(err)
    }
}