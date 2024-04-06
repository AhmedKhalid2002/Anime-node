import { Anime } from "../../../DB/model/anime.model.js";
import { Review } from "../../../DB/model/review.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createReview = asyncHandler(async (req, res, next) => {
    const anime = await Anime.findById(req.params.id);

    if (!anime)
        return next(new Error("Anime not found", { cause: 404 }));

    let review = await Review.findOne({ animeId: anime._id });

    if (!review) {
        review = await Review.create({
            ...req.body,
            userId: req.user.id,
            animeId: anime._id,
        });
        return res.json({
            success: true,
            review,
        });
    }

    const comment = JSON.stringify(req.body.comment);

    review.comment.push(comment );
    await review.save();

    return res.json({
        success: true,
        message: "Review added successfully",
    });
});

export const updateReview=asyncHandler(async (req,res,next)=>{

    const anime=await Anime.findById(req.body.animeId);
    if(!anime)
        return next(new Error("Anime not found",{cause:404}));

    const review=await Review.findById(req.params.id);
    if(!review)
        return next(new Error("Review not found",{cause:404}));

    review.rating=req.body.rating?req.body.rating:review.rating;

    if (req.body.comments && Array.isArray(req.body.comments)) {
        req.body.comments.forEach(updatedComment => {
            const existingCommentIndex = review.comment.findIndex(comment => String(comment._id) === updatedComment._id);
            if (existingCommentIndex !== -1) {
                review.comment[existingCommentIndex].comment = updatedComment.comment;
            }
        });
    }
    await review.save();

    return res.json({
        success:true,
        message:"review updated successfully",
    })
});

export const deleteReview=asyncHandler(async (req,res,next)=>{

    const anime=await Anime.findById(req.body.animeId);
    if(!anime)
        return next(new Error("Anime not found",{cause:404}));

    const review=await Review.findById(req.params.id);
    if(!review)
        return next(new Error("Review not found",{cause:404}));

    await review.deleteOne();

    return res.json({
        success:true,
        message:"review deleted successfully",
    })
})

export const allReview=asyncHandler(async (req,res,next)=>{
    const reviews =await Review.find({}).populate("animeId").populate("userId");
    if(!reviews)
        return next(new Error("Reviews not found"))

    return res.json({
        success:true,
        reviews,
    })
})
export const spicificReview=asyncHandler(async (req,res,next)=>{

    const reviews =await Review.findOne({animeId:req.params.id}).populate("animeId").populate("userId");
    if(!reviews)
        return next(new Error("Review not found"))
    
    return res.json({
        success:true,
        reviews,
    })
})