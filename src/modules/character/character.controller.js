import { asyncHandler } from "../../utils/asyncHandler.js"
import cloudinary from "../../utils/cloud.js";
import { Character } from "../../../DB/model/character.model.js";
import { Anime } from "../../../DB/model/anime.model.js";

export const createCharacter=asyncHandler(async (req,res,next)=>{

    const anime =await Anime.findById(req.params.id);
    if(!anime)
        return next(new Error("anime not found"))

    if(!req.file)
        return next(new Error("image is required"));

    const {public_id,secure_url} =await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.CLOUD_FOLDER_NAME}/characters of animes`
    })
    const character=await Character.create({
        ...req.body,
        animeId:anime._id,
        createdBy:req.user.id,
        image:{id:public_id,url:secure_url}
    })

    return res.json({
        success:true,
        message:"Character created successfully",
        character,
    })
})

export const updateCharacter=asyncHandler(async (req,res,next)=>{

    const character=await Character.findById(req.params.id);
    if(!character)
        return next(new Error("character of anime not found",{cause:404}))

    if(req.user.id.toString() != character.createdBy.toString())    
        return next(new Error("you can't updated character",));

    if(req.file){
        const {public_id,secure_url}=await cloudinary.uploader.upload(req.file.path,{
            public_id:character.image.id
        });
        character.image={id:public_id,url:secure_url}
    }

    character.name=req.body.name?req.body.name:character.name
    character.description=req.body.description?req.body.description:character.description

    await character.save()
    return res.json({
        success:true,
        message:"character updated successfully"
    })
})

export const deleteCharacter=asyncHandler(async (req,res,next)=>{

    const character=await Character.findById(req.params.id);
    if(!character)
        return next(new Error("character of anime not found",{cause:404}))

    if(req.user.id.toString() != character.createdBy.toString())    
        return next(new Error("you can't deleted character",));

    await Character.findByIdAndDelete(req.params.id);

    await cloudinary.uploader.destroy(character.image.id);

    return res.json({
        success:true,
        message:"Character deleted successfully",
    })
})

export const allCharacter=asyncHandler(async (req,res,next)=>{
    const character =await Character.find({}).populate("animeId");
    return res.json({
        success:true,
        character,
    })
});

export const spicificCharacter=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const anime=Anime.findById(id);
    if(!anime)
        return next(new Error("Anime not found"))

    const character=await Character.find({animeId:id}).populate("animeId");
    if(!character)
        return next(new Error("The character not found"));

    return res.json({
        success:true,
        character,
    })
})
export const chracterDetails=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const chracter=await Character.findOne({_id:id});
    if(!chracter)
        return next(new Error("Character not found"));

    return res.json({
        success:true,
        chracter
    })
})

export const searchByname=asyncHandler(async (req,res,next)=>{
    const {name}=req.query;
    const {id}=req.params;
    const character=await Character.find
    ({name:{$regex:name,$options:"i"},animeId:id});
    if(!character)
        return next(new Error("Character not found",{cause:404}));

    return res.json({
        success:true,
        character,
    })
})