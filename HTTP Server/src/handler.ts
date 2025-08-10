import {IncomingMessage,ServerResponse} from "http";
const PORT = 3000

type JsonResponse =
    {message:string} | {error:string}
export const handler = async (req:IncomingMessage,res:ServerResponse)=>{
    const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`)
    console.log(`Request for ${url.pathname} with method ${req.method}`);

    res.setHeader('Content-Type', 'application/json');

    let data : JsonResponse;
    if(req.method === "GET"){
        res.statusCode =  200
        if(url.pathname ==="/"){
             data = {message:"Welcome to Jad HTTP Web Server"}
        }else if(url.pathname ==="/about"){
            data = {message:"This is the about route"}
        }else{
            res.statusCode = 404
            data = { error: "Route not found" }
        }
    }else {
        res.statusCode = 404
        data = { error: "Methode Not Allowed" }
    }
    res.end(JSON.stringify(data))
}