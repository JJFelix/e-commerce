import mongoose from 'mongoose'

const dbConnect = () =>{
    try {
        const conn = mongoose.connect(`mongodb+srv://johnsmith96441:${process.env.DB_PASSWORD}@cluster0.nhqyuty.mongodb.net/?retryWrites=true&w=majority`)        
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err)     
    }
}

export default dbConnect