import { Schema, Types,model } from "mongoose";

const characterSchema =new Schema({
    name:{type:String,required:true},
    animeId:{type:Types.ObjectId,ref:"Anime",required:true},
    description:{type:String,required:true},
    image:{id:{type:String},url:{type:String}},
    createdBy:{type:Types.ObjectId,ref:"User"}
},{
    timestamps:true,
})

export const Character=model('Character',characterSchema)