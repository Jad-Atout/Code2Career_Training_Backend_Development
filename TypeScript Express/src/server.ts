import dotenv from "dotenv";
dotenv.config();
import express, {Response, Request, NextFunction} from "express";
import session from "express-session"
import path from "node:path";
import * as fs from "node:fs";
import {userRouter} from "./users/user.router";
import {handelError} from "./util/exception";
import {isProduction} from "./config/app.config";
import {courseRouter} from "./courses/course.router";
import authRouter from "./auth/auth.routes";
const app = express();
const PORT = 4000
//TODO add the public Files
//TODO implement the file uploading with the course



app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret: "secret value",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: isProduction}
}))

app.use(
    express.static(path.join(__dirname, "public"),{
        setHeaders:(res, path) => {
            // @ts-ignore
            res.setHeaders('cache-control', `public max-age=${5}`);
        }
    })
)

app.use('/api/v1/user',userRouter)
app.use('/api/vi/course',courseRouter)
app.use('/api/v1/auth',authRouter)


app.use((err:Error,req:Request,res:Response, next:NextFunction)=>{
    handelError(err,res)
})

const notFoundPath = path.join(__dirname,'public','404.html')

const NotFoundPageHTML = fs.readFileSync(notFoundPath,'utf8')
app.use((req:Request,res:Response)=>{

    if(req.path.startsWith('/api/')){
        return res.status(404).json({
            success:false,
            message: `Route ${req.method} ${req.path} not found`
        })
    }
    const dynamicHtml = NotFoundPageHTML.replace(/{{requestedPath}}/g,req.path)
        .replace(/{{method}}/g,req.method)
        .replace(/{{timestamp}}/g,new Date().toLocaleString());

    res.status(404).send(dynamicHtml);
})

app.listen(PORT,()=>{
    console.log('App is running in port: ', PORT);
})

