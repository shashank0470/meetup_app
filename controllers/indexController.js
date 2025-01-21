const { CURSOR_FLAGS } = require('mongodb');
const User = require('../models/user');


module.exports.getalluser = async(req, res) =>{
    try{
        console.log(req.cookies);
        res.cookie("hhhhh", 66)
        return res.render("index",{title: "main page"})
    }
    catch(error){
        console.error("There is a error with main page", error)
        return res.status(500).send("There is a error with main page")
    }
};

