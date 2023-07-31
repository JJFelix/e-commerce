import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/authRoute.js'
import productRouter from './routes/productRoute.js'
import blogRouter from './routes/blogRoute.js'
import productCategoryRouter from './routes/productCategoryRoute.js'
import blogCategoryRouter from './routes/blogCategoryRoute.js'
import couponRouter from './routes/couponRoute.js'
import  brandRouter from './routes/brandRoute.js'

import { notFound, errorHandler } from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'



dotenv.config()
const app = express()

// middleware
app.use(morgan('combined'))
app.use(express.json())
app.use(cookieParser())
 
// routes
app.use('/api/users', authRouter)
app.use('/api/products', productRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/productCategory', productCategoryRouter)
app.use('/api/blogCategory', blogCategoryRouter)
app.use('/api/brand', brandRouter)
app.use('/api/coupon', couponRouter)
// custom middlewares
app.use(notFound)
app.use(errorHandler)

mongoose.connect(
    `mongodb+srv://johnsmith96441:${process.env.DB_PASSWORD}@cluster0.nhqyuty.mongodb.net/?retryWrites=true&w=majority`
    ).then(()=>
        app.listen(process.env.PORT, ()=>{
            console.log(`Connected to mongodb.\nServer listening on http://localhost:${process.env.PORT}`)
        })
    ).catch((err)=> console.error(err)
)