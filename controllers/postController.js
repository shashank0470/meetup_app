const { name } = require("ejs");
const Post = require("../models/post");


module.exports.create = async(req, res) =>{
    try{

        // if (!req.isAuthenticated()) {
        //     return res.redirect('back'); // or wherever you want to redirect
        // }

        const post = await Post.create({
            content: req.body.content,
            user: req.user.id
        })

        return res.redirect("back");
    } 
    catch(err){
        console.error("There is a error", err);
    }
} 


module.exports.destroy = async(req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        await Post.findByIdAndDelete(req.params.id);
        return res.redirect("back")
    }
    catch(err){
        console.error("There is a error with deleting the comment", err)
    }
};