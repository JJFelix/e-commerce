import { query } from "express"
import Product from "../models/Product.js"
import slugify from "slugify"

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