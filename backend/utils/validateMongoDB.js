import mongoose from "mongoose"

export const validateMongoDBId = (id)=>{
    const isValid = mongoose.Types.ObjectId.isValid(id)

    if(!isValid){
        console.error('This ID is not valid')
    }
}