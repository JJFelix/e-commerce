import Blog from "../models/Blog.js"
import User from '../models/User.js'
import {validateMongoDBId} from '../utils/validateMongoDB.js'

export const createBlog = async (req, res, next)=>{
    try {
        const newBlog = await Blog.create(req.body)      
        console.log('Blog created successfully')
        return res.status(200).json({message: "Blog created successfully", newBlog})
    } catch (err) {
        console.error("Unexpected error occurred", err);        
        return res.status(500).json({err})    
    }
}

export const getBlogs = async (req, res, next)=>{
    try {
        const blogs = await Blog.find()  
        if(!blogs){
            console.log('Blogs not found')
            return res.status(404).json({message:"Blogs not found"})
        }      
        return res.status(200).json(blogs)
    } catch (err) {
        console.error("Unexpected error occurred", err);        
        return res.status(500).json({err})       
    }
}

export const getBlog = async (req, res, next)=>{ 
    const { id } = req.params
    validateMongoDBId(id)
    try {
        const blog = await Blog.findByIdAndUpdate(
            id,
            { $inc:{numViews:1} },
            { new:true }
        ) 
        if(!blog){
            console.log('Blog not found')
            return res.status(404).json({message:"Blog not found"})
        }
        console.log('Blog retrieved successfully')
        return res.status(200).json({message: `Blog ${id} retrieved successfully`, blog})
    } catch (err) {
        console.error("Unexpected error occurred", err);        
        return res.status(500).json({err})    
    }
}

export const updateBlog = async(req, res, next)=>{
    const { id } = req.params
    validateMongoDBId(id)
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        ) 
        console.log('Blog updated successfully')
        return res.status(200).json({message: "Blog updated successfully", updatedBlog})
    } catch (err) {
        console.error("Unexpected error occurred", err);        
        return res.status(500).json({err})    
    }
}

export const deleteBlog = async(req, res, next)=>{
    const { id } = req.params
    validateMongoDBId(id)
    try {
        const deleteBlog = await Blog.findByIdAndRemove(id) 
        if(!deleteBlog){
            console.log('Blog not found')
            return res.status(404).json({message:"Blog not found"})
        }
        console.log('Blog deleted successfully')
        return res.status(200).json({message: `Blog ${id} deleted successfully`})
    } catch (err) {
        console.error("Unexpected error occurred", err);        
        return res.status(500).json({err})    
    }
}

export const likeBlog = async (req, res, next)=>{
    const {blogId} = req.body
    validateMongoDBId(blogId)
    const blog = await Blog.findById(blogId)
    const loggedInUserId = req?.user._id
    validateMongoDBId(loggedInUserId)
    const isLiked = blog?.isLiked
    const dislikedBlog = blog?.dislikes?.find((userId)=> userId?.toString() === loggedInUserId?.toString())
    if(dislikedBlog){
        const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull:{ dislikes:loggedInUserId.toString() },
                isDisliked:false,
            },{new:true}     
        )
        console.log("Dislike removed")
        return res.status(200).json(blog)
    }
    
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate( blogId, {
                $pull:{ likes:loggedInUserId.toString() },
                isLiked:false,
            },{new:true}     
        )
        console.log("Like removed")
        return res.status(200).json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId, {
                $push:{ likes:loggedInUserId.toString() },
                isLiked:true,
            },{new:true}     
        )
        console.log("Liked")
        return res.status(200).json(blog)
    }
}

export const dislikeBlog = async (req, res, next)=>{
    const {blogId} = req.body
    validateMongoDBId(blogId)
    const blog = await Blog.findById(blogId)
    const loggedInUserId = req?.user._id
    validateMongoDBId(loggedInUserId)
    const isDisliked = blog?.isDisliked
    const likedBlog = blog?.likes?.find((userId)=> userId?.toString() === loggedInUserId?.toString())
    if(likedBlog){
        const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull:{ likes:loggedInUserId.toString() },
                isliked:false,
            },{new:true}     
        )
        console.log("Like removed")
        return res.status(200).json(blog)
    }
    
    if(isDisliked){
        const blog = await Blog.findByIdAndUpdate( blogId, {
                $pull:{ dislikes:loggedInUserId.toString() },
                isDisliked:false,
            },{new:true}     
        )
        console.log("Dislike removed")
        return res.status(200).json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId, {
                $push:{ dislikes:loggedInUserId.toString() },
                isDisliked:true,
            },{new:true}     
        )
        console.log("Disliked")
        return res.status(200).json(blog)
    }
}
