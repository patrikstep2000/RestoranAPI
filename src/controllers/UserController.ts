import { Request, Response } from "express";
import AuthRepo from "../repo/Auth/AuthRepo";
import UserRepo from "../repo/Auth/AuthRepo";
import { MailerHelpers } from "../utils/MailerHelpers";

class UserController{
    
    public static createUser = async(req:Request, res:Response)=>{
        try {

            let payload = req.body;
            if(payload.password) payload.password = AuthRepo.encrypt(payload.password);
            payload = {password:"", ...payload};
            const [user] = await UserRepo.createUser(payload)
            if(!payload.password.length)
            await MailerHelpers.sendOnboardingEmail(user.id, user.email);
            res.status(200).json(user)
        } 
        catch(e) {
        res.status(400).json(e);
        }
    }

    

}

export default UserController
