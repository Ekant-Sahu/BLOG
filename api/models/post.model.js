import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        userId:{
            type : String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image:{
            type: String,
            default: 'https://th.bing.com/th/id/OIP.veSgoo_apQcD_Leesjxx6wHaDs?w=331&h=174&c=7&r=0&o=5&dpr=1.8&pid=1.7',
        },
        category: {
            type: String,
            default: 'uncatergorized',
        },
        slug:{
            type: String,
            required: true,
            unique: true
        },
    },{timestamps: true}
);

const Post = mongoose.model('Post',postSchema);

export default Post;