import Product from "../models/Product.js"
import User from '../models/User.js'
import slugify from "slugify"
import fs from 'fs'
import { validateMongoDBId } from '../utils/validateMongoDB.js'
import { cloudinaryUploadImg } from '../utils/cloudinary.js'

export const addProduct = async (req, res, next)=>{
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)  
        console.log("New product added")
        res.status(200).json({newProduct})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")
    }
}

export const getProduct = async (req, res, next)=>{
    const {id} = req.params
    try {
        const product = await Product.findById(id)   
        if(!product){
            console.log("Product not found"); 
            return res.status(400).json({message:"Product not found"})
        }
        console.log("Product retrieved"); 
        return res.status(200).json(product)
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")       
    }
}

export const getProducts = async (req, res, next)=>{
    try {
        //filtering
        const queryObj = { ...req.query } 
        const excludeFields = ['page', 'sort','limit','fields']
        excludeFields.forEach((el) => delete queryObj[el])

        // console.log(queryObj)
        let queryString = JSON.stringify(queryObj)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        // console.log(JSON.parse(queryString));
        let query = Product.find(JSON.parse(queryString))

        // sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }else{
            query = query.sort('-createdAt')
        }

        //limiting fields
        if (req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        }else{
            query = query.select('-__v')
        }

        //pagination
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        // console.log(page, limit, skip);
        query = query.skip(skip).limit(limit)

        if(req.query.page){
            const productCount = await Product.countDocuments()
            if(skip >= productCount) {
                console.log("This page does not exist")
                return res.status(404).json({message: "Page does not exist....Yet"})
            }            
        }
        const products = await query 

        if(!products){
            console.log("Products not found"); 
            return res.status(400).json({message:"Products not found"})
        } 
        console.log("Products retrieved"); 
        return res.status(200).json(products)
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")       
    }
}

export const updateProduct = async (req, res, next)=>{
    const {id} = req.params
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        )   
        if(!product){
            console.log("Product not found"); 
            return res.status(404).json({message:"Product not found"})
        }
        console.log("Product updated"); 
        return res.status(200).json(product)
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")       
    }
}

export const deleteProduct = async (req, res, next)=>{
    const {id} = req.params
    try {
        const product = await Product.findByIdAndRemove(id)   
        if(!product){
            console.log("Product not found"); 
            return res.status(404).json({message:"Product not found"})
        }
        console.log("Product deleted"); 
        return res.status(200).json(product)
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")       
    }
}

export const addToWishlist = async (req, res, next)=>{
    const { id } = req.user
    const { prodId } = req.body
    try {
        const user = await User.findById(id)
        const alreadyAdded = user.wishlist.find( (id) => id.toString() == prodId )

        if(alreadyAdded){
            await User.findByIdAndUpdate(id, {
                $pull: {wishlist: prodId}}, {new:true}
            )

            let updatedWishlist = await User.findById(id)

            console.log("Product removed from wishlist")
            return res.status(200).json({message:"Product removed from wishlist", updatedWishlist})
        }else{
            await User.findByIdAndUpdate(id, {
                $push: {wishlist: prodId}}, {new:true}
            )
            let updatedWishlist = await User.findById(id)
            console.log("Product added to wishlist")
            return res.status(200).json({message:"Product added to wishlist", updatedWishlist})
        }
        
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")
    }
}

export const rating = async (req, res, next)=>{
    const {id} = req.user
    const {star, comment, prodId} = req.body
    try {
        const product = await Product.findById(prodId)
        let alreadyRated = product.ratings.find((userId) => userId.postedBy.toString() === id.toString())
        if(alreadyRated){
            await Product.updateOne(
                {ratings: { $elemMatch: alreadyRated}},
                {$set: {
                    "ratings.$.star":star,
                    "ratings.$.comment":comment
                }},
                {new:true}
            )  
            console.log("Product rating updated")   
            // return res.status(200).json({message:"Product rating updated"})
        }else{
            await Product.findByIdAndUpdate(
                prodId, {
                    $push:{
                        ratings:{
                            star: star,
                            comment:comment,
                            postedBy: id
                        }
                    }
                }
            )
            console.log("Product rated")
            // return res.status(200).json(({message: "Product rated"}))
        }

        const getAllRatings = await Product.findById(prodId)
        let totalRatings = getAllRatings.ratings.length
        let ratingSum = getAllRatings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0)
        console.log(`Total ratings: ${totalRatings}, Rating sum: ${ratingSum}`);

        let actualRating = (ratingSum / totalRatings).toFixed(1)
        let finalProduct = await Product.findByIdAndUpdate( prodId, 
            { totalRatings: actualRating }, 
            { new:true  }
        )
        return res.status(200).json({message: "Product rating complete", finalProduct})
    } catch (err) {
        console.log("Unexpected error occurred")
        return res.status(500).json("Unexpected error occurred")
    }
}

export const uploadImages = async (req, res, next)=>{
    const {id} = req.params
    validateMongoDBId(id)
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images")   
        const urls = []
        const files = req.files
        for (const file of files){
            const { path } = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        const findProduct = await Product.findByIdAndUpdate(id,
            { images: urls },
            { new:true }
        )
        console.log("Images uploaded")
        return res.status(200).json({message:"Images uploaded", findProduct})
    } catch (err) {
        console.log("Unexpected error occurred", err)
        return res.status(500).json({message:"Unexpected error occurred.", err})
    }
}