const mongoose = require("mongoose");
const { timeStamp } = require("node:console");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        
    }


}, {//it looks for the timestamps when the data is entered and edited
    timestamps:true
});

const user = mongoose.model("user",userSchema); 

module.exports = user;