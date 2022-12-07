import Joi from "joi";

const createUserSchema = Joi.object({
    first_name:Joi.string().regex(/^[a-zA-Zčćđžš]{2,35}$/).required(),
    last_name:Joi.string().regex(/^[a-zA-Zčćđžš]{2,35}$/).required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    role_id:Joi.number().integer().positive().custom((val:number)=>{
        if([1,2].includes(val)){
            return val;
        }
        throw new Error("Role doesn't exist");
    }).optional()
})

export default createUserSchema;