import { Request, Response } from "express";
import UserRepo from "../repo/Auth/AuthRepo";
import { MailerHelpers } from "../utils/MailerHelpers";

class UserController{
    
    public static createUser = async(req:Request, res:Response)=>{
        try {

            let payload = req.body;
            payload = {password:"", ...payload};
            const [user] = await UserRepo.createUser(payload)
            await MailerHelpers.sendOnboardingEmail(user.id, user.email);
            res.status(200).json(user)
        } 
        catch(e) {
        res.status(400).json(e);
        }
    }

}

export default UserController
