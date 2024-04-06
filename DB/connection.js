import mongoose from "mongoose"

const connectionDB= async()=>{
    return await mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>console.log("DB connection successfully"))
    .catch(()=>console.log("Faild in DB connection"))
}

export default connectionDB;