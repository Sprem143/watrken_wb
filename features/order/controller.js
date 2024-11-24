const Order= require('./model');

exports.order=async(req,res)=>{
    try{
        console.log('order')
        const name= req.body.name
        const mobile= req.body.mobile
        const address= req.body.address
        const quantity= req.body.quantity
        const pincode= req.body.pincode
    const order= new Order({name,mobile,address,quantity,pincode});
    let result=await order.save();
    if(result){
        console.log(result)
        res.status(200).send(true);
    }
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}

exports.getorder=async(req,res)=>{
    try{
       let orders= await Order.find({mobile:req.body.mobile})
       if(orders){
         res.status(200).send(orders);
       }else{
        res.send("No order found")
       }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

exports.cancel=async(req,res)=>{
    try{
    const id= req.body.id
    let order= await Order.findOneAndDelete({_id:id});
    if(order){
        res.status(200).send('Order cancel successfully')
    }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}