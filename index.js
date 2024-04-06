import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import  connectionDB  from './DB/connection.js';
import authRouter from './src/modules/auth/auth.router.js';
import animeRouter from './src/modules/anime/anime.router.js';
import characterRouter from './src/modules/character/character.router.js';
import reviewRouter from './src/modules/review/review.router.js';
import seasonRouter from './src/modules/season/season.router.js';

dotenv.config();

const app = express()
const port = process.env.PORT

// ^ cores
app.use(cors())
// ^ morgan
app.use(morgan('combined'))

// ^ parsing
app.use(express.json())

// ^ connection DB
connectionDB()

// ^ router
app.use('/auth',authRouter);
app.use('/anime',animeRouter);
app.use('/character',characterRouter);
app.use('/review',reviewRouter);
app.use('/season',seasonRouter);


// ^ error not found
app.all("*",(req,res,next)=>{
    return next(new Error('The page not found',{cause:404}));
})

// ^ global error
app.use((error,req,res,next)=>{
    const statusCode=error.cause || 500;
    return res.status(statusCode).json({
        success:false,
        message:error.message,
        stack:error.stack,
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))