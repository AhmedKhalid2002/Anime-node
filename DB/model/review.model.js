import { Schema, Types, model } from "mongoose";

const reviewSchema=new Schema({
    rating:{type:Number,min:1,max:10,required:true},
    comment:[{type:String,required:true}],
    userId:{type:Types.ObjectId,ref:"User",required:true},
    animeId:{type:Types.ObjectId,ref:"Anime",required:true}
},{
    timestamps:true,
});

export const Review=model('Review',reviewSchema)