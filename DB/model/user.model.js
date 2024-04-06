import { Schema, Types, model } from "mongoose";
import bcryptjs from 'bcryptjs'
const userSchema=new Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    country:{type:String,required:true},
    role:{type:String,enum:["admin","user"],default:'user'},
    favorites:[{type:Types.ObjectId,ref:"Anime"}],
    watchList:[{type:Types.ObjectId,ref:"Anime"}],
    avatar:{id:{type:String},url:{type:String}},
    forgetCode:String,
    isConfirmed:{type:Boolean,default:false}
},{
    timestamps:true,
})

userSchema.pre("save",function(){
    if(this.isModified("password")){
        this.password=bcryptjs.hashSync(this.password,parseInt(process.env.SALT_ROUND))
    }
})

export const User=model("User",userSchema);