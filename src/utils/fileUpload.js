import multer, { diskStorage } from 'multer'

export const fileUpload=()=>{
    const fileFilter=(req,file,cb)=>{
        if(!["image/png","image/jpg","image/jpeg","video/mp4","video/mpeg"].includes(file.mimetype))
                return cb(new Error("Invalid format"),false)

        return cb(null,true)
    }

    return multer({
        storage:diskStorage({}),
        fileFilter,
    })

}