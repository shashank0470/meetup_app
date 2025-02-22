const Post = require("../../../models/post")
const Comment = require("../../../models/comment")

module.exports.index = async(req, res) =>{

    const posts = await Post.find({}).populate("user","name").populate("comments"," -_id content")

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}


module.exports.destroy = async(req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        await Post.findByIdAndDelete(req.params.id);



        // req.flash("success", "Post and Comments are deleted")
        
        return res.json(200, {
            message: "Post and associated comment deleted successfully"
        })
    }
    catch(err){
        console.error("error:", err)
        return res.json(500, {
            message: "Internal server error",
        })
    }
}; 