import { Anime } from "../../../DB/model/anime.model.js";
import { Season } from "../../../DB/model/season.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createSeason=asyncHandler(async (req,res,next)=>{
    const anime=await Anime.findById(req.params.id)
    if(!anime)
        return next(new Error("Anime not found",{cause:404}));

    const season=await Season.create({
        ...req.body,
        animeId:anime._id,
        userId:req.user.id
    })

    return res.json({
        success:true,
        message:"season created successfully",
        season
    })
});

export const updateSeason=asyncHandler(async (req,res,next)=>{

    const season=await Season.findById(req.params.id)
    if(!season)
        return next(new Error("Season not found"))

    if(req.user.id.toString() !== season.userId.toString())
        return next(new Error("Not allowed updated the season"));

    season.seasonNumber=req.body.seasonNumber?req.body.seasonNumber:season.seasonNumber;
    season.year=req.body.year?req.body.year:season.year;
    season.episodes=req.body.episodes?req.body.episodes:season.episodes;
    await season.save();
    return res.json({
        success:true,
        message:"season updated successfully"
    })
})

export const deleteSeason=asyncHandler(async (req,res,next)=>{

    const season=await Season.findById(req.params.id)
    if(!season)
        return next(new Error("Season not found"))

    if(req.user.id.toString() !== season.userId.toString())
        return next(new Error("Not allowed deleted the season"));

    await Season.findByIdAndDelete(req.params.id)  

    return res.json({
        success:true,
        message:"season deleted successfully"
    })
})

export const allSeason=asyncHandler(async (req,res,next)=>{

    const season=await Season.find({}).populate("animeId")
    if(!season)
        return next(new Error("Season not found",{cause:404}))

    return res.json({
        success:true,
        season
    })
})

export const spicificSeason=asyncHandler(async (req,res,next)=>{

    const season=await Season.findById(req.params.id).populate("animeId")
    if(!season)
        return next(new Error("Season not found",{cause:404}))

    return res.json({
        success:true,
        season
    })
})