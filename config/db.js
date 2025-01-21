const mongoose = require("mongoose")
const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/meetup")
        console.log("The connection is success")
    }
    catch(error){
        console.error("There is a error:",error)
    }
}

module.exports = connectDB;