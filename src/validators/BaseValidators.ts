import { NextFunction, Request, Response } from "express";


import createUserSchema from "../schemas/CreateUserSchema";


export const validateUserBody = (req:Request, res:Response, next:NextFunction)=>{
    const result = createUserSchema.validate(req.body);
    if(result.error) throw new Error("Invalid body" + result.error.message);
    next();
}




