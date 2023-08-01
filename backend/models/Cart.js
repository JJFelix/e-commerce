import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    products:[
        {
            product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
            },
            color:String,
            price:Number,
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
});

//Export the model
const Cart = mongoose.model('Cart', cartSchema);
export default Cart