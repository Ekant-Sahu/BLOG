import { errorHandler } from "../utils/error.js";
import bcrptjs from 'bcryptjs';
import User from "../models/user.model.js";

export const test = (req,res) => {
    res.json({message: 'api is working'});
}
export const updateUser = async (req, res, next) =>{
    if(req.user.id != req.params.userId){
        return next(errorHandler(403,"you are not allowed to update this user"))
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400,'paaword must be at least 6 character'))
        }
        req.body.password = bcrptjs.hashSync(req.body.password,10);
    }
    if(req.body.username){
      if(req.body.username.length < 7 || req.body.username.length > 20){
        return next(errorHandler(400,'usernmae must be between 7 and 20 character'))
      }       
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                profilPicture: req.body.profilPicture,
                password: req.body.password
            },  
        },{new: true});
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch(error){
        next(error);
    }

} 