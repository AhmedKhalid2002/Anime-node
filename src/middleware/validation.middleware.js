import { Types } from "mongoose";

export const validation=(schema)=>{
    return (req,res,next)=>{
        const data={...req.params,...req.body,...req.query};
        const validationResult=schema.validate(data,{abortEarly:false});

        if(validationResult.error){
            const errorMessage=validationResult.error.details.map((err)=>err.message);
            return next(new Error(errorMessage,{cause:400}))
        }
        return next()
    }
}

export const validObjectId=(value,helper)=>{
    if(Types.ObjectId.isValid(value))return true;
    
    return helper.message("Invalid object ID")
}