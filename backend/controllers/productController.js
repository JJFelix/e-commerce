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
        const products = await Product.find()  
        if(!products){
            console.log("Products not found"); 
            return res.status(400).json({message:"Products not found"})
        } 
        console.log("All Products retrieved"); 
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