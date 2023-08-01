import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    products:[
        {
            product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
            },
            color:String
        }
    ],
    paymentMethod:{},
    orderStatus:{
        type:String,
        default:"Not Processed",
        enum:["Not Processed", "Processing", "Cancelled", "Dispatched", "Cash on Delivery", "Delivered"]
    },
    orderBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
});

//Export the model
const Order = mongoose.model('Order', orderSchema);
export default Order