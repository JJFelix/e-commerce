import User from "../models/User.js"
import jwt from 'jsonwebtoken'

export const authMiddleware = async(req, res, next)=>{
    if(req?.headers?.authorization?.startsWith('Bearer')){
        const token = req.headers.authorization.split(' ')[1]
        try {
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                // console.log(decoded)
                const user = await User.findById(decoded?.id)
                req.user = user
                next()
            }
        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: 'Not authorized. Token possibly expired. Please log in again' })
        }
    }else{
        console.error("No token found")
        return res.status(500).json({message: "No token found"})
    }
}

export const isAdmin = async (req, res, next)=>{
    const { email } = req.user
    
    try {
        const adminUser = await User.findOne({email})        
        if(adminUser.role !== 'admin'){
            console.log('You are not an admin')
            return res.status(401).json({message:"You are not an admin"})
        }
        // console.log("Admin check passed")
        next()
    } catch (err) {
        console.log(err)        
        return res.status(500).json({message:"Unexpected error occurred"})
    }
}