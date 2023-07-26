import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/authRoute.js'
import { notFound, errorHandler } from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())
 
// routes
app.use('/api/users',authRouter)

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