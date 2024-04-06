import { Anime } from "../../../DB/model/anime.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import cloudinary from "../../utils/cloud.js";
import { nanoid } from "nanoid";

export const addAnime=asyncHandler(async (req,res,next)=>{
    
    if(!req.file)
        return next(new Error("image is required"));

    const {public_id,secure_url}=await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.CLOUD_FOLDER_NAME}/poster of animes`
    })
    const anime=await Anime.create({
        ...req.body,
        poster:{
            id:public_id,
            url:secure_url
        },
        createdBy:req.user.id,
    },);

    return res.json({
        success:true,
        message:"Anime added successfully",
        anime
    })
})

export const addVideo=asyncHandler(async (req,res,next)=>{

    if(!req.files)
        return next(new Error("Video is required"));

    let videos=[];
    let folderCloud=nanoid()
    for (const file of req.files.video){
        const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{
            folder:`${process.env.CLOUD_FOLDER_NAME}/videos of anime/${req.body.videoNumber}${folderCloud}`
            
        })
        videos.push({secure_url,public_id})
    }
    const animeVideo=await Anime.findById(req.params.id,{vidieo:videos,videoNumber:req.body.videoNumber},{new:false});

    return res.json({
        success:true,
        message:"Video uploaded successfully",
        animeVideo,
    })
})

export const updateAnime=asyncHandler(async (req,res,next)=>{

    const anime=await Anime.findById(req.params.id);

    if(req.user.id.toString() !== anime.createdBy.toString())
            return next(new Error("Not allowed updated the Anime"));

    if(req.file){
        const {public_id,secure_url}=await cloudinary.uploader.upload(req.file.path,{
            public_id:anime.poster.id,
        });
        anime.poster={id:public_id,url:secure_url}
    }

    anime.name=req.body.name?req.body.name:anime.name;
    anime.genre=req.body.genre?req.body.genre:anime.genre;
    anime.episode=req.body.episode?req.body.episode:anime.episode;
    anime.synopise=req.body.synopise?req.body.synopise:anime.synopise;
    anime.releaseDate=req.body.releaseDate?req.body.releaseDate:anime.releaseDate;
    anime.status=req.body.status?req.body.status:anime.status;
    anime.studio=req.body.studio?req.body.studio:anime.studio;
    anime.director=req.body.director?req.body.director:anime.director;

    await anime.save();
    return res.json({
        success:true,
        message:"Anime updated successfully"
    })
})

export const deleteAnime=asyncHandler(async (req,res,next)=>{
    const anime=await Anime.findById(req.params.id);

    if(req.user.id.toString() !== anime.createdBy.toString())
            return next(new Error("Not allowed Delete the Anime"));

    if(!anime)
        return next(new Error("Anime not found",{cause:404}));

    await Anime.findByIdAndDelete(req.params.id);
    
    await cloudinary.uploader.destroy(anime.poster.id)
    return res.json({
        success:true,
        message:"Anime Deleted successfully"
    })
})

export const allAnimes=asyncHandler(async (req,res,next)=>{
    
    const animes=await Anime.find({});

    return res.json({
        success:true,
        animes,
    })
})

export const spicificAnimies=asyncHandler(async (req,res,next)=>{
    const {name}=req.query;
    const animes=await Anime.find({name:{$regex:name,$options:"i"}});
    if(!animes)
        return next(new Error("Character not found",{cause:404}));

    return res.json({
        success:true,
        animes,
    })
})