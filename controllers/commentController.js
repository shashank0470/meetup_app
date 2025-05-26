const Post = require('../models/post');
const Comment = require('../models/comment');
const commentsMailer = require("../mailer/comments-mailer")


module.exports.create = async(req, res)=>{
    try {
        const post = await Post.findById(req.body.post)
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user.id,
                post: req.body.post
            });

            post.comments.push(comment._id)
            await post.save();

            // Correct populate method
            comment = await comment.populate("user", "name email");
            
            // Corrected mailer call
            // await commentsMailer.comments_mail(comment);
            
    


            
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created"
                });
            }

            req.flash("success", "Comment added successfully!")
            return res.redirect("/")
        }
        
        req.flash("error", "Post not found")
        return res.redirect("back")
    }
    catch(err){
        console.error("Error creating comment:", err);
        req.flash("error", "Failed to create comment. Please try again.")
        return res.redirect("back");
    }
};