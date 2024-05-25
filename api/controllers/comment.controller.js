import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";
export const createComment = async (req,res,next) => {


    try {
        const{content, postId,userId} = req.body;
        if(userId !== req.user.id){
            return next(errorHandler(403,"you are not allowed to create this comment"))
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        });
        await newComment.save();
        res.status(200).json(newComment);
        
    } catch (error) {
        next(error);
    }
}

export const getPostCommet = async (req,res,next) =>{
    try {
        // Fetch comments for the specified postId
        const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
        
        // Send the fetched comments as the response
        res.status(200).json(comments);
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
}