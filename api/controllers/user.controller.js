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

export const deleteUser = async(req,res,next)=>{
    if(!req.user.isAdmin && req.user.id!==req.params.userId){
        return next(errorHandler(403,'You are not allowed to delet this user'));
    }
    try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been deleted');
    }catch(error){
        next(error);
    }
}
export const logout = async(req,res,next) =>{
    try{
        res.clearCookie('access_token').status(200).json("User has been loged Out")
    } catch(error) {
        next(error);
    }   
}

export const getUsers = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403,'you are not allowed to see all users'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const now = new Date();
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);



        const users = await User.find().sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);
        const usersWithoutPassword = users.map((user)=>{
            const {password, ...rest } = user._doc;
            return rest;
        })
        const totalUsers = await User.countDocuments();
        const lastMonthUsers = await User.countDocuments({
            createdAt: {$gte: oneMonthAgo},
        })
        
        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });
    } catch(error) {
        next(error);
    }
}

export const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.userId);
        if(!user){
            next(errorHandler(404,'User not found'));
        }
        const {password,...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}