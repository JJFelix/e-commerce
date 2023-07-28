import ProductCategory from "../models/ProductCategory.js"
import { validateMongoDBId } from '../utils/validateMongoDB.js'

export const createCategory = async (req, res, next)=>{
    try {       
        const newCategory = await ProductCategory.create(req.body)
        console.log("Category created")
        return res.status(200).json({message:"Category created", newCategory})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")               
    }
}

export const getCategorys = async (req, res, next)=>{
    try {       
        const categorys = await ProductCategory.find()
        if(!categorys){
            console.log("No categorys found")
            return res.status(404).json({message:"No categorys found"})
        }
        console.log("Categorys retrieved")
        return res.status(200).json({message:"Categorys retrieved", categorys})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")               
    }
}

export const getCategory = async (req, res, next)=>{
    const {id}  = req.params
    validateMongoDBId(id)
    try {       
        const category = await ProductCategory.findById(
            id, req.body, {new:true}
        )
        if(!category){
            console.log("Category not found")
            return res.status(404).json({message:"Category not found"})
        }
        console.log("Category retrieved")
        return res.status(200).json({message:"Category retrieved", category})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")               
    }
}

export const updateCategory = async (req, res, next)=>{
    const {id}  = req.params
    validateMongoDBId(id)
    try {       
        const updatedCategory = await ProductCategory.findByIdAndUpdate(
            id, req.body, {new:true}
        )
        if(!updatedCategory){
            console.log("Category not found")
            return res.status(404).json({message:"Category not found"})
        }
        console.log("Category updated")
        return res.status(200).json({message:"Category updated", updatedCategory})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")               
    }
}

export const deleteCategory = async (req, res, next)=>{
    const {id}  = req.params
    validateMongoDBId(id)
    try {       
        const deletedCategory = await ProductCategory.findByIdAndRemove(
            id, req.body, {new:true}
        )
        if(!deletedCategory){
            console.log("Category not found")
            return res.status(404).json({message:"Category not found"})
        }
        console.log("Category deleted")
        return res.status(200).json({message:"Category deleted", deletedCategory})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")               
    }
}
