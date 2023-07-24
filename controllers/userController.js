import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import generateToken from "../config/jwToken.js"

export const register = async (req,res, next) => {
    const { name, email, mobile, password }  = req.body
    
    try {
        const existingUser = await User.findOne({ email })
        if(!existingUser){
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                name:name,
                email:email,
                mobile:mobile,
                password:hashedPassword
            })
            await newUser.save()
            console.log({newUser})
            res.status(200).json({ newUser })
        }else{
            // throw new Error('User already exists')

            console.log("User already exists")
            return res.status(500).json({ success: false, message: "User already exists"})
        }
    } catch (err) {
        console.error(err)        
        return res.status(500).json(err)
    }
}

export const login = async (req, res, next) =>{
    const {email, password} = req.body

    try {
        const existingUser = await User.findOne({ email })     
        if(existingUser){
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            if(isPasswordCorrect){
                console.log("Login successful")
                return res.status(200).json({
                    message: "Login successful",
                    _id:existingUser?._id,
                    name:existingUser?.name,
                    email:existingUser?.email,
                    mobile:existingUser?.mobile,
                    token:generateToken(existingUser?._id),
                })
            }else{
                console.error("Password incorrect")
                return res.status(401).json({ message: "Password incorrect"})
            }
        }else{
            console.error("User not found");
            return res.status(404).json({message:"User not found"})
        }
    } catch (err) {
        console.error("Unexpected error occurred", err);        
        return res.status(500).json({err})
    }
}
