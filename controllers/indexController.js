const Post = require('../models/post');
const User = require('../models/user');


module.exports.getalluser = async(req, res) =>{
    try {
        // The populate() method in Mongoose is used to automatically replace a field in a document with the actual data from a related document.
        // For instance, if you have two collections, like Users and Posts, where each post stores a user ID to reference its author, you can use populate() to replace that user ID in the Posts collection with the full user information from the Users collection. This makes it easier to access related data without having to manually query each collection.

                 // this "-_id" does not all the id to get display along with the content

        const posts = await Post.find({}).populate("user","name").populate("comments"," -_id content")
        
        const users = await User.find({});

        return res.render('index', { posts, // Make sure this matches your EJS file name
            title: 'Home',
            // here the first posts is the variable which is used, second posts is equal to = await Post.find({}), so it will find the comments or post which is there is post model
            posts: posts,
            users: users
        });
    } 
    catch(error){
        console.error("There is a error with main page", error)
        return res.status(500).send("There is a error with main page")
    }
};



