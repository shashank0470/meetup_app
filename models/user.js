const mongoose = require("mongoose");
const { timeStamp } = require("node:console");
const multer  = require('multer')
const path = require("path");
const AvatarPath = path.join("uploads/users/avatar")


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
        
    },
    avatar: {
        type: String,
    },


}, {//it looks for the timestamps when the data is entered and edited
    timestamps:true
});

//The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.join(__dirname, ".." , AvatarPath ))}
    ,
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
    } 
})
//single: This tells multer to accept a single file upload from a form field named "avatar"
//****a static method because it handles file uploads at the model level, not for individual users.****
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single("avatar");
//this helps make this avatar path available publically
userSchema.statics.Avatar_Path = AvatarPath;

const user = mongoose.model("user",userSchema); 

module.exports = user;