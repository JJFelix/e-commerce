import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
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
const Brand = mongoose.model('Brand', brandSchema);
export default Brand