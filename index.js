const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
const port = 8000;
const expressEjsLayouts = require("express-ejs-layouts");
const connectDB = require("./config/db")

//used for session cookie or to store the users information 
const session = require("express-session")
const passport = require("passport")
const localPassport = require("./config/passport_config")

//connect mongo is used to store our cookie
const Mongostore = require("connect-mongo")


const bodyParser = require('body-parser');
const path = require("path")

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "public")))

app.use(expressEjsLayouts)
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))

app.use(session({
    name:"meetup",
    secret:"shashankpantishero",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge:(1000 * 40 * 100)
    },
    //by writing this we permanantly set our session, and now it will not get expired
    store: Mongostore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/meetup'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

const Userroutes = require("./routes/userRoutes");
const Indexroutes = require("./routes/indexRoutes")

connectDB();

app.use("/user",Userroutes)
app.use("/",Indexroutes)



app.listen(port, function(error, data){
    if(error){
        console.log("There is a error")
    }else(console.log("The port is running at:", port))
})