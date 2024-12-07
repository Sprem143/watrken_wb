const Order = require('./model');
const nodemailer = require('nodemailer');
const Seller= require('../seller/model')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'premcschariraha@gmail.com',
        pass: 'odwr nbkz rqva whgd',
    },
});

async function sendemail(order) {
const seller= await Seller.find({});
console.log(seller)
let slr= seller.map((s)=>s.email)
console.log(slr);

   if(Array.isArray(slr)){

    slr.map((s)=>{

        const mailOptions = {
            from: 'premcschariraha@gmail.com', 
            to: `${s}`, 
            subject: 'Prem Common Service Center',
            html: `
              <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f4f9;
                color: #333;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: #4CAF50;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                margin: 10px 0;
            }
            .content a {
                color: #4CAF50;
                text-decoration: none;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #aaa;
                background: #f9f9f9;
            }
            .footer a {
                color: #4CAF50;
                text-decoration: none;
            }
                .logo{
                hieght:4px;
                width:40px;
                }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Order Notification</h1>
            </div>
            <div class="content">
                <p>Dear Seller,</p>
                <p>You have a new order!</p>
                <p><strong>Customer Name:</strong> ${order.name}</p>
                <p><strong>Order Date:</strong> ${order.time}</p>
                <p><strong>Product Name:</strong> 20L Water</p>
                <p><strong>Shipping Address:</strong> <a href=${order.location} target="_blank">View Address</a></p>
                <p>Thank you for using our platform!</p>
                <p>Best regards,</p>
                <p> <img src="https://res.cloudinary.com/dfnzn3frw/image/upload/v1733508016/uploads/qxaonktmans5thdrbqig.png" class="logo"/> <strong>Watrken Pvt Ltd</strong></p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Watrken pvt. ltd. All rights reserved.</p>
                <p><a href="#">Unsubscribe</a> | <a href="#">Contact Support</a></p>
            </div>
        </div>
    </body>
    </html>
    
              `,
    
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });
    })

   
   }
   
}

exports.order = async (req, res) => {
    try {
        console.log('order')
        const name = req.body.name
        const mobile = req.body.mobile
        const address = req.body.address
        const quantity = req.body.quantity
        const location = req.body.location

        const order = new Order({ name, mobile, address, quantity, location });
        let result = await order.save();
        if (result) {
            sendemail(result);
            res.status(200).send(true);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

exports.getorder = async (req, res) => {
    try {
        let orders = await Order.find({ mobile: req.body.mobile })
        if (orders) {
            res.status(200).send(orders);
        } else {
            res.send("No order found")
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.cancel = async (req, res) => {
    try {
        const id = req.body.id
        let order = await Order.findOneAndDelete({ _id: id });
        if (order) {
            res.status(200).send('Order cancel successfully')
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}