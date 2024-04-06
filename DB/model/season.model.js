import { Schema, Types, model } from "mongoose";

const seasonSchema=new Schema({
    seasonNumber:{type:Number,required:true},
    year:{type:String,required:true}, // سنه صدور الانمي
    episodes:{type:Number,required:true}, // عدد حلقات الموسم
    animeId:{type:Types.ObjectId,ref:'Anime'},
    userId:{type:Types.ObjectId,ref:"User",required:true},
},{
    timestamps:true,
});

export const Season=model('Season',seasonSchema);