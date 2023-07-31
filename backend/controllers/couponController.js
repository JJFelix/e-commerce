import Coupon from "../models/Coupon.js"
import { validateMongoDBId } from '../utils/validateMongoDB.js'

export const createCoupon = async (req, res, next)=>{
    try {
        const newCoupon = await Coupon.create(req.body)

        console.log("Coupon created")
        return res.status(200).json({message:"Coupon created", newCoupon})
    } catch (err) {
        console.log("Unexpected error occurred")
        return res.status(500).json("Unexpected error occurred")        
    }
}

export const getCoupons = async (req, res, next)=>{
    try {
        const coupons = await Coupon.find()
        if(!coupons){
            console.log("No coupons available")
            return res.status(404).json({message:"No coupons available"})
        }
        console.log("Coupons retrieved")
        return res.status(200).json({message:"Coupons retrieved", coupons})
    } catch (err) {
        console.log("Unexpected error occurred")
        return res.status(500).json("Unexpected error occurred")        
    }
}

export const getCoupon = async (req, res, next)=>{
    const {id} = req.params
    validateMongoDBId(id)
    try {
        const coupon = await Coupon.findById(id)
        if(!coupon){
            console.log("Coupon not found")
            return res.status(404).json({message:"Coupon not found"})
        }
        console.log("Coupon retrieved")
        return res.status(200).json({message:"Coupon retrieved", coupon})
    } catch (err) {
        console.log("Unexpected error occurred")
        return res.status(500).json("Unexpected error occurred")        
    }
}

export const updateCoupon = async (req, res, next)=>{
    const {id} = req.params
    validateMongoDBId(id)
    try {
        const coupon = await Coupon.findByIdAndUpdate(id, req.body, {new:true})
        if(!coupon){
            console.log("Coupon not found")
            return res.status(404).json({message:"Coupon not found"})
        }
        console.log("Coupon updated")
        return res.status(200).json({message:"Coupon updated", coupon})
    } catch (err) {
        console.log("Unexpected error occurred")
        return res.status(500).json("Unexpected error occurred")        
    }
}

export const deleteCoupon = async (req, res, next)=>{
    const {id} = req.params
    validateMongoDBId(id)
    try {
        const coupon = await Coupon.findByIdAndRemove(id)
        if(!coupon){
            console.log("Coupon not found")
            return res.status(404).json({message:"Coupon not found"})
        }
        console.log("Coupon deleted")
        return res.status(200).json({message:"Coupon deleted", coupon})
    } catch (err) {
        console.log("Unexpected error occurred")
        return res.status(500).json("Unexpected error occurred")        
    }
}