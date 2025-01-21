const express = require("express");
const port = 8000;
const cookieParser = require("cookie-parser")
const path = require("path")
const Userroutes = require("./routes/userRoutes");
const Indexroutes = require("./routes/indexRoutes")
const expressEjsLayouts = require("express-ejs-layouts");

const bodyParser = require('body-parser');

const connectDB = require("./config/db")


const app = express();
app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))
app.use("/public", express.static(path.join(__dirname, "public")))

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(expressEjsLayouts)



app.use("/user",Userroutes)
app.use("/",Indexroutes)


app.listen(port, function(error, data){
    if(error){
        console.log("There is a error")
    }else(console.log("The port is running at:", port))
})