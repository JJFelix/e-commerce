import Brand from '../models/Brand.js'
import { validateMongoDBId } from '../utils/validateMongoDB.js'

export const createBrand = async (req, res, next)=>{
    try {       
        const newBrand = await Brand.create(req.body)
        console.log("Brand created")
        return res.status(200).json({message:"Brand created", newBrand})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")               
    }
}

export const getBrands = async (req, res, next)=>{
    try {   
        const brands = await Brand.find()
        if(!brands){
            console.log("No brands found")
            return res.status(404).json({message:"No brands found"})
        }
        console.log("Brands retrieved")
        return res.status(200).json({message:"brands retrieved", brands})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")               
    }
}

export const getBrand = async (req, res, next)=>{
    const {id}  = req.params
    validateMongoDBId(id)
    try {       
        const brand = await Brand.findById(id)
        if(!brand){
            console.log("Brand not found")
            return res.status(404).json({message:"Brand not found"})
        }
        console.log("Brand retrieved")
        return res.status(200).json({message:"Brand retrieved", brand})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")               
    }
}

export const updateBrand = async (req, res, next)=>{
    const {id}  = req.params
    validateMongoDBId(id)
    try {       
        const updatedBrand = await Brand.findByIdAndUpdate(
            id, req.body, {new:true}
        )
        if(!updatedBrand){
            console.log("Brand not found")
            return res.status(404).json({message:"Brand not found"})
        }
        console.log("Brand updated")
        return res.status(200).json({message:"Brand updated", updatedBrand})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")               
    }
}

export const deleteBrand = async (req, res, next)=>{
    const {id}  = req.params
    validateMongoDBId(id)
    try {       
        const deletedBrand = await Brand.findByIdAndRemove(
            id, req.body, {new:true}
        )
        if(!deletedBrand){
            console.log("Brand not found")
            return res.status(404).json({message:"Brand not found"})
        }
        console.log("Brand deleted")
        return res.status(200).json({message:"Brand deleted", deletedBrand})
    } catch (err) {
        console.error(err);        
        return res.status(500).json("Uexpected error occurred")               
    }
}
