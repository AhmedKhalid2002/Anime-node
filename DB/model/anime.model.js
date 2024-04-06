import { Schema, Types, model } from "mongoose";

const animeSchema=new Schema({
    name:{type:String,required:true},
    genre:{type:String,required:true}, // انواع الانمي اكشن او كوميدي
    episode:{type:Number,required:true}, // عدد الحلقات
    synopise:{type:String,required:true},  // ملخص الانمي
    releaseDate:{type:String,required:true}, // تاريخ الاصدار
    status:{type:String,enum:["completed","ongoing","inProduction"],required:true},
    studio:{type:String,default:'unknown',required:true},
    director:{type:String,required:true},
    poster:{id:{type:String,required:true},url:{type:String,required:true}},
    vidieo:[
        {
            id:{type:String,required:true},
            url:{type:String,required:true},
            videoNumber:{type:Number,required:true}
        }
    ],
    createdBy:{type:Types.ObjectId,ref:"User",required:true},
},{
    timestamps:true,
});

export const Anime=model("Anime",animeSchema);