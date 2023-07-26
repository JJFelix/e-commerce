import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import generateToken from "../config/jwToken.js"
import { validateMongoDBId } from "../utils/validateMongoDB.js"
import generateRefreshToken from '../config/refreshToken.js'
import jwt, { decode } from 'jsonwebtoken'

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
            console.log(`New user ${newUser._id} created`)
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
            const refreshToken = generateRefreshToken(existingUser?._id)
            const existingUserUpdate = await User.findOneAndUpdate(
                existingUser._id, 
                { refreshToken: refreshToken },
                { new:true }
            )
            res.cookie(
                'refreshToken', refreshToken,{
                    httpOnly: true,
                    maxAge: 72 * 60 * 60 * 1000
                }
            )
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

export const handleRefreshToken = async (req, res, next)=>{
    const cookie = req.cookies
    if(!cookie?.refreshToken){
        console.log("No refresh token found in cookies")
    }
    const refreshToken = cookie.refreshToken
    const user =  await User.findOne({ refreshToken })

    if(!user){
        throw new Error('No refresh token present in database')
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded)=>{
        if (err || user.id !== decoded.id){
            throw new Error('There is something wrong with refresh token')
        }
        const accessToken = generateToken(user._id)
        console.log(refreshToken);
        return res.status(200).json(accessToken)
    })
    // return res.status(200).json({user})
}

export const logout = async (req, res, next)=>{
    const cookie = req.cookies
    if(!cookie?.refreshToken){
        console.log("No refresh token found in cookies")
    }
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    if(!user){
        res.clearCookie('refreshToken', {
            httpOnly:true,
            secure:true
        })
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate(
        {refreshToken:refreshToken}, 
        {refreshToken:""}
    )
    res.clearCookie("refreshToken", {
        httpOnly:true,
        secure:true
    })
    return res.sendStatus(204)
}

export const getUsers = async (req, res, next)=>{
    try {
        const users = await User.find()   
        if(!users)       {
            console.log('No users not found')
            res.status(404).json({message: 'Users not found'})
        }  
        console.log("Users retrieved")
        return res.status(200).json(users)
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: "Unexpected error occurred"})
    }
}

export const getUser = async(req, res, next)=>{
    const {id}=req.params
    validateMongoDBId(id)
    try {
        const user = await User.findById(id) 
        if(!user)       {
            console.log('User not found')
            return res.status(404).json({message: `User ${id} not found`})
        }
        console.log(`User ${id} retrieved`)
        return res.status(200).json(user)
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: "Unexpected error occurred"})
    }
}

export const updateUser = async (req, res, next)=>{
    const {id} = req.user
    validateMongoDBId(id)
    try {
        const user = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        console.log(`User ${id} updated`)
        return res.status(200).json({ user })
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: "Unexpected error occurred"})
    }
}

export const deleteUser = async(req, res, next)=>{
    const {id}=req.params
    validateMongoDBId(id)
    try {
        const user = await User.findByIdAndRemove(id) 
        if(!user)       {
            console.log('User not found')
            return res.status(404).json({message: `User ${id} not found`})
        }
        // console.log(user)
        return res.status(200).json(user)
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: "Unexpected error occurred"})       
    }
}

export const blockUser = async (req, res, next)=>{
    const { id } = req.params
    validateMongoDBId(id)
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { isBlocked: true },
            { new:true }
        ) 
        console.log(`User ${id} has been blocked`)
        return res.status(200).json({message:`User ${id} has been blocked`, user})
    } catch (err) {
        console.error(err)
        return res.status(500).json({message:"Unexpected error occurred"})
    }
}

export const unBlockUser = async (req, res, next)=>{
    const { id } = req.params
    validateMongoDBId(id)
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { isBlocked: false },
            { new:true }
        ) 
        console.log(`User ${id} has been unblocked`)
        return res.status(200).json({message:`User ${id} has been unblocked`, user})
    } catch (err) {
        console.error(err)
        return res.status(500).json({message:"Unexpected error occurred"})
    }    
}

