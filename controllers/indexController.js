
const User = require('../models/user');



module.exports.getalluser = async(req, res) =>{
    try{
        const userId = req.cookies.user_id;
        if(userId){
            const user = await User.findById(userId);
            return res.render("index", {user})
        }
    }
    catch(error){
        console.error("There is a error with main page", error)
        return res.status(500).send("There is a error with main page")
    }
};

