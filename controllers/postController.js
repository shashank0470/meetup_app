const { name } = require("ejs");
const Post = require("../models/post");


module.exports.create = async(req, res) =>{
    try{

        // if (!req.isAuthenticated()) {
        //     return res.redirect('back'); // or wherever you want to redirect
        // }
        req.flash("success", "post successfully created")
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        const populatedPost = await Post.findById(post._id).populate('user');

        //XHR (XMLHttpRequest) is the original way of making AJAX requests before fetch and jQuery came along
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: {  // This matches what newPostDom expects
                        _id: populatedPost._id,
                        content: populatedPost.content,
                        user: {
                            name: populatedPost.user.name
                        }
                    }
                },
                message: "post created!"
            });
        }
        req.flash("success", "post successfully created");
        return res.redirect("back");
        
    }
    catch(err){
        req.flash("error", err);
    }
} 


module.exports.destroy = async(req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        await Post.findByIdAndDelete(req.params.id);

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted successfully!"
            });
        }

        req.flash("success", "Post and Comments are deleted")
        
        return res.redirect("back")
    }
    catch(err){
        req.flash("error",err);
    }
}; 