import mongoose, { mongo } from 'mongoose'

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    quantity:{
        required:true,
        type: Number,
    },
    sold:{
        type:Number,
        default:0,
        // select:false
    },
    images:[],
    color:{
        type:String,
        required:true
    },
    ratings:[
        {
        star: Number,
        comment:String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId, 
            ref:"User"
        }
        }
    ],
    totalRatings:{
        type:String,
        default:0
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)
export default Product