const Post = require('../models/post');
const User = require('../models/user');


module.exports.getalluser = async(req, res) =>{
    try {
        // Using async/await instead of callback
        const posts = await Post.find({}).populate("user","name")
            
        return res.render('index', { posts, // Make sure this matches your EJS file name
            title: 'Home',
            // here the first posts is the variable which is used, second posts is equal to = await Post.find({}), so it will find the comments or post which is there is post model
            posts: posts
        });
    } 
    catch(error){
        console.error("There is a error with main page", error)
        return res.status(500).send("There is a error with main page")
    }
};



