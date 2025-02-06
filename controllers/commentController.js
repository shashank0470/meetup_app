const Post = require('../models/post');
const Comment = require('../models/comment');
const { post } = require('../routes/userRoutes');

module.exports.create = async(req, res)=>{
    try{
        const post = await Post.findById(req.body.post)
        if(post){
            const comment = await Comment.create({
                content: req.body.content,
                user: req.user.id,
                post: req.body.post
            })
            post.comments.push(comment._id)
            post.save();

            res.redirect("/")
        }
        if(!post){
            return res.redirect("back")
        }
    }
    catch(err){
        console.error("There is a error", err)
    }
};