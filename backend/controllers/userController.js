import User from "../models/User.js"
import Product from '../models/Product.js'
import Cart from "../models/Cart.js"
import Coupon from '../models/Coupon.js'
import bcrypt from 'bcryptjs'
import generateToken from "../config/jwToken.js"
import { validateMongoDBId } from "../utils/validateMongoDB.js"
import generateRefreshToken from '../config/refreshToken.js'
import jwt, { decode } from 'jsonwebtoken'
import crypto from 'crypto'
import { sendEmail } from "./emailController.js"


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

export const loginAdmin = async (req, res, next) =>{
    const {email, password} = req.body

    try {
        const existingAdmin = await User.findOne({ email })    
        if(existingAdmin.role !== "admin"){
            console.log("Not an admin")
            return res.status(401).json({message:"Not an admin"})
        }
        if(existingAdmin){
            const refreshToken = generateRefreshToken(existingAdmin?._id)
            const existingAdminUpdate = await User.findOneAndUpdate(
                existingAdmin._id, 
                { refreshToken: refreshToken },
                { new:true }
            )
            res.cookie(
                'refreshToken', refreshToken,{
                    httpOnly: true,
                    maxAge: 72 * 60 * 60 * 1000
                }
            )
            const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password)
            if(isPasswordCorrect){
                console.log("Login successful")
                return res.status(200).json({
                    message: "Login successful",
                    _id:existingAdmin?._id,
                    name:existingAdmin?.name,
                    email:existingAdmin?.email,
                    mobile:existingAdmin?.mobile,
                    token:generateToken(existingAdmin?._id),
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

export const resetPasswordToken = async (req, res, next)=>{
    const { id } = req.user
    const { password } = req.body
    // console.log(id, password)

    const resetToken = crypto.randomBytes(32).toString('hex')
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    const passwordResetExpires = Date.now() + 30 * 60 * 1000 //ten minutes

    try {
    validateMongoDBId(id)
    const user = await User.findById(id)
    // console.log(user)

    if(!user){
        console.log("User not found")
        return res.status(404).json({message:"User not found"})
    }else{
        if (password){
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword            
            user.passwordResetToken = passwordResetToken
            user.passwordResetExpires = passwordResetExpires
            const updatedUser = await user.save()
            console.log(updateUser)
            return res.status(200).json(updatedUser)
        }else{
            return res.status(200).json(user)
        }
    }        
    } catch (err) {
        console.error("Unexpected error occurred", err);        
        return res.status(500).json({err})      
    } 
}

export const forgotPasswordToken = async (req, res, next) =>{
    // console.log(req.user)
    const { email } = req.user

    const resetToken = crypto.randomBytes(32).toString('hex')
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    const passwordResetExpires = Date.now() + 30 * 60 * 1000 //ten minutes

    try {
        const user = await User.findOne({email})
        if(!user){
            console.log("User not found")
            return res.status(404).json({message:"User not found"})
        }

        const token = resetToken
        user.passwordResetToken = passwordResetToken
        user.passwordResetExpires = passwordResetExpires

        await user.save()
        // console.log(user)

        const resetURL = `Click <a href="http://localhost:6000/api/users/resetPassword/${token}">here</a> to reset your password. Valid for 30 minutes from now.`
        const data = {
            to:email,
            subject:"Password reset",
            text:"You made a request to reset your password",
            htm:resetURL
        }

        sendEmail(data)

        return res.status(200).json(token)

    } catch (err) {
        console.error("Unexpected error occurred", err);        
        return res.status(500).json({err})  
    } 
}

export const resetPassword = async (req, res, next)=>{
    console.log("hello reset password")

    const { password } = req.body
    const { token } = req.params
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    try {
        const user = await User.findOne({ 
            passwordResetToken: hashedToken,
            passwordResetExpires: {$gt:Date.now()}
        })

        if(!user){
            console.log("Token expired. Please click on forgot password again")
            return res.status(404).json({message:"Token expired. Please click on forgot password again"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.passwordResetToken = undefined
        user.passwordResetExpires=undefined

        await user.save()
        console.log("Password reset successfully")
        return res.status(200).json({message:"Password reset successful", user})
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

export const getWishlist = async (req, res, next)=>{
    const {id} = req.user
    try {
        const findUser = await User.findById(id).populate("wishlist")
        res.status(200).json({message:"User found", findUser})
    } catch (err) {
        console.error(err)
        return res.status(500).json({message:"Unexpected error occurred"})
    }
}

export const userCart = async(req, res, next)=>{
    const { id } = req.user
    validateMongoDBId(id)
    const {cart} = req.body
    console.log("Cart length: ",cart.length);
    try {
        const products = []
        const user = await User.findById(id)
        const cartExists = await Cart.findOne({ orderBy:user._id })  
        if(cartExists){
            cartExists.remove()        
        }          
        for (let i=0; i<cart.length; i++){
            let object = {}
            object.product = cart[i].prodId
            object.count = cart[i].count
            let getPrice = await Product.findById(cart[i].prodId).select("price").exec()
            object.price = getPrice.price
            products.push(object)
        }
        let cartTotal = 0
        for (let i = 0; i<products.length; i++){
            cartTotal += products[i].price * products[i].count
        }
        let newCart = await Cart({
            products, cartTotal, orderBy:user._id
        })
        await newCart.save()

        console.log("Cart saved")
        return res.status(200).json({message:"Cart saved", newCart})            
    } catch (err) {
        console.error(err)
        return res.status(500).json({message:"Unexpected error occurred", err})        
    }
}

export const getUserCart = async (req, res, next)=>{
    const {id}= req.user
    validateMongoDBId(id)

    try {
        const cart = await Cart.findOne({orderBy:id}).populate("products.product")        
        console.log("Cart retrieved")
        return res.status(200).json({message:"Cart retrieved", cart})
    } catch (err) {
        console.error(err)
        return res.status(500).json({message:"Unexpected error occurred", err})
    }
}

export const emptyCart = async (req, res, next)=>{
    const {id} = req.user
    validateMongoDBId(id)
    try {
        const user = await User.findById(id)
        const cart = await Cart.findOneAndRemove({orderBy:user._id})
        if(!cart){
            console.log(`Cart for ${user.name} not found`)
            return res.status(404).json({message:`Cart for user ${user.name} not found`})
        }
        console.log(`Cart for user ${user.name} removed`)
        return res.status(200).json({message:`Cart for user ${user.name} removed`, cart})
    } catch (err) {
        console.error(err)
        return res.status(500).json({message:"Unexpected error occurred"})        
    }
}

export const applyCoupon = async (req, res, next)=>{
    const {id} = req.user
    const {coupon} = req.body
    try {
        const validCoupon = await Coupon.findOne({name:coupon})   
        console.log(validCoupon);
        if(validCoupon === null || validCoupon.expiry <= Date.now()){
            console.log("Invalid/expired coupon")
            return res.status(200).json({message:"Invalid/expired coupon"})
        }
        let {cartTotal} = await Cart.findOne({orderBy:id}).populate("products.product")
        let totalAfterDiscount = (cartTotal - (cartTotal * (validCoupon.discount)/100)).toFixed(2)
        const newCart = await Cart.findOneAndUpdate(
            {orderBy:id},
            {totalAfterDiscount},
            {new:true}
        )
        console.log("Coupon applied")
        return res.status(200).json({message:"Coupon applied", newCart})
    } catch (err) {
        console.error(err)
        return res.status(500).json({message:"Unexpected error occurred",err})        
    }
}
