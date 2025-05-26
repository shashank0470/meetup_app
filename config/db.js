const mongoose = require("mongoose");

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/meetup`)

}

module.exports = connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.