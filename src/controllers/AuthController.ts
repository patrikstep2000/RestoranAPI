import { Request, Response } from "express";
import UserType from "../models/User";
import AuthRepo from "../repo/Auth/AuthRepo";
import { MailerHelpers } from "../utils/MailerHelpers";


class AuthController {
    static ResetPassword = async (req: Request, res: Response) => {
        const {key, password} = req.body;
        try{
        const user = await AuthRepo.getUserByResetCode(key);
        await AuthRepo.setNewPassword(AuthRepo.encrypt(password), user.id);
        await AuthRepo.deleteResetCode(user.id);
        res.sendStatus(200);
    }
    catch(e){
        res.sendStatus(400)
    }
    }

      
    public static sendResetEmail = async(req:Request, res:Response)=>{
        try {

            const {email} = req.body;
            const [user] = await AuthRepo.getUser(email)
            await MailerHelpers.sendOnboardingEmail(user.id, user.email);
            res.status(200).json(user)
        } 
        catch(e) {
        res.status(400).json(e);
        }
    }

    public static AuthenticateUser = async (req: Request, res: Response) =>{
        try{
            const {email, password} = req.body;
            console.log(req.cookies)
            const b = AuthRepo.encrypt(password);
            let user:Partial<UserType> | null = null;
            const [userWithEmail] = await AuthRepo.getUser(email);
            if(userWithEmail.password && AuthRepo.decrypt(userWithEmail.password)===password){
                user = {...userWithEmail, role: userWithEmail.role || 1};
            }
            delete user?.password;
            const token = AuthRepo.generateJwt(user);
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.setHeader('Access-Control-Allow-Credentials', "true");

            res.cookie("token", token, { maxAge: 900000, httpOnly: true});
            res.status(200).json({token});
        }catch{
            res.status(400).send("Invalid email or password!");
        }
    }
}

export default AuthController;