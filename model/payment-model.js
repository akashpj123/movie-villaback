import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    razorpay_order_id:{
        type:String, 
        required:true
    },
    razorpay_payment_id:{
        type:String,
        require: true
    },
    razorpay_signature:{
        type:String,
        require: true
    },
   
})

const paymentModel = mongoose.model("Payment", paymentSchema);

export { paymentModel as Payment };