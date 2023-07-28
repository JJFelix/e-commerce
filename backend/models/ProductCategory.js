import mongoose from 'mongoose'

const productCategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
},{
    timestamps:true
});

//Export the model
const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
export default ProductCategory