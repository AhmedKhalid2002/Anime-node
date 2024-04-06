import { User } from "../../../DB/model/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../utils/sendEmail.js";
import { resetPassTemp, signUpTemp } from "../../utils/htmlTempletes.js";
import { acctivateAccount } from "../../utils/activateAccount.js";
import bcryptjs from 'bcryptjs';
import { Token } from "../../../DB/model/token.model.js";
import randomstring from 'randomstring'
import cloudinary from '../../utils/cloud.js'

export const signup=asyncHandler(async(req,res,next)=>{
    const {email}=req.body;

    const user =await User.findOne({email});
    if(user)
        return next(new Error("User already existed",{cause:400}));
    
    const token=jwt.sign({email},process.env.SECRET_KEY);
    
    await User.create({...req.body})

    const confirmLink=`https://anime-node.vercel.app/auth/active_account/${token}`;

    const message=await sendEmail({
        to:email,
        subject:"Activition account",
        html:signUpTemp(confirmLink)
    })
    if(!message)
    return next(new Error("somting went wrong "))

    return res.json({
        success:true,
        message:"Check your email"
    })
})

export const activateAccount=asyncHandler(async (req,res,next)=>{
    const {token}=req.params;

    const {email}=jwt.verify(token,process.env.SECRET_KEY);

    const user=await User.findOneAndUpdate({email},{isConfirmed:true});

    if(!user)
        return next(new Error("User not found",{cause:404}));

    return res.send(acctivateAccount())
});

export const login=asyncHandler(async (req,res,next)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user)
        return next(new Error("Invalid Email"));

    const match=bcryptjs.compareSync(password,user.password);
    if(!match)
        return next(new Error("Invalid Password"));

    const validEmail=await User.findOne({isConfirmed:true});

    if(!validEmail)
        return next(new Error("You should active account!"));

    const token=jwt.sign({email:user.email,id:user._id,country:user.country,userName:user.userName,role:user.role},process.env.SECRET_KEY);
    await Token.create({
        token,
        user:user._id,
    })

    return res.json({
        success:true,
        message:"You can login now",
        token,
        user
    })
})

export const forgetCode=asyncHandler(async(req,res,next)=>{
    const {email}=req.body;

    const user=await User.findOne({email});

    if(!user)
        return next(new Error("user not found",{cause:404}));

    const forgetcode=randomstring.generate({
        charset:'numeric',
        length:5
    })

    user.forgetCode=forgetcode;
    await user.save();

    const codeMessage=await sendEmail({
        to:user.email,
        subject:"Reset Password",
        html:resetPassTemp(forgetcode)
    })

    if(!codeMessage)
        return next(new Error("somting went wrong!"));

    return res.json({
        success:true,
        message:"Check your email"
    })
})

export const resetPassword=asyncHandler(async (req,res,next)=>{
    const {email,password,forgetCode}=req.body;
    const user=await User.findOne({email});

    if(!user)
        return next(new Error("Invalid email"));

    if(forgetCode != user.forgetCode)
        return next(new Error("Code is Invalid"));

    user.password=bcryptjs.hashSync(password,parseInt(process.env.SALT_ROUND))
    await user.save();

    const tokens=await Token.find({user:user._id})
    tokens.forEach(async (token)=>{
        token.isValid=false;
        await token.save()
    })
    return res.json({
        success:true,
        message:"Try login now",
    })
})

export const uploadAvatar=asyncHandler(async (req,res,next)=>{
    
    const user =await User.findById(req.user.id);
    if(!req.file)
        return next(new Error("Avatar is required",{cause:404}));

        const {public_id,secure_url}=await cloudinary.uploader.upload(req.file.path,{
            public_id:user.avatar.id,
        })
    user.avatar={id:public_id,url:secure_url};
    await user.save();
    return res.json({
        success:true,
        message:"Avatar changed successfully",
        user
    })
})



export const showAvatar=asyncHandler(async(req,res,next)=>{
    const avatars=await User.findOne({_id:req.user.id},{password:0,isConfirmed:0});
    if(!avatars)
        next(new Error("Avatar not found"));

    return res.json({
            success:true,
            avatars
        })
})
export const updatePassword=asyncHandler(async(req,res,next)=>{
    const {password,newPassword}=req.body;
    const userData=req.user;
    const isUser=await User.findById(userData._id);

    const match=bcryptjs.compareSync(password,isUser.password);
    if(!match)
        return next(new Error("password incorrect"));

    const hashNewPassword=bcryptjs.hashSync(newPassword,parseInt(process.env.SALT_ROUND));

    const updatePass=await User.findByIdAndUpdate({_id:userData.id},{password:hashNewPassword});

    if(!updatePass)
        return next(new Error("password not updated"))
    
    return res.json({
        success:true,
        message:"Password updated successfully"
    })
}) 


export const userData=asyncHandler(async(req,res,next)=>{
    const {userName,country}=req.body;
    
    const user=await User.findById(req.user.id);
    if(!user)
        return next(new Error("User not found"));

    user.userName=userName?userName:user.userName;
    user.country=country?country:user.country;
    await user.save();
    
    // const token=jwt.sign({email:user.email,id:user._id,country:user.country,userName:user.userName,role:user.role},process.env.SECRET_KEY);
    // await Token.findOne({user:user._id,token})

    return res.json({
        success:true,
        message:"User updated successfully",
        // token
    })
})