import mongoose from 'mongoose'

const BlogCategorySchema = new mongoose.Schema({
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
const BlogCategory = mongoose.model('BlogCategory', BlogCategorySchema);
export default BlogCategory