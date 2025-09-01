import {ModuleNameType} from "./constant.js";
import {Response} from "express";

export class CustomError extends Error {
    public errorType = 'custom'
    constructor(
        msg:string,
    public moduleName: ModuleNameType,
    public statusCode: number,
    ) {
        super(msg);
    }
}
export const handelError = (error:unknown,res:Response)=>{
    if(error instanceof CustomError){
        res.status(error.statusCode).send(error.message)
        return
    }
    console.log(`internal server error`,error)
    res.status(500).send("internal server error")
}