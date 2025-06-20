//here we use the functionality of express or use express
require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;

// Core Node.js modules
const fs = require('fs');
const path = require("path"); 

// Express and view-related modules
const expressEjsLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser');
const session = require("express-session");

// Database and authentication modules
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const localPassport = require("./config/passport_config");
const JwtPassport = require("./config/passport-jwt");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

// Flash messages and middleware
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");

//sass for better css or something like that, lol
const sass = require("sass");

// Function to compile Sass
async function compileSass() {
    try {
        const layoutResult = await sass.compileAsync(path.join(__dirname, 'public/sass/layout.scss'));
        fs.writeFileSync(path.join(__dirname, 'public/css/layout.css'), layoutResult.css);
        console.log('layout.scss compiled successfully!');

        const indexResult = await sass.compileAsync(path.join(__dirname, 'public/sass/index.scss'));
        fs.writeFileSync(path.join(__dirname, 'public/css/index.css'), indexResult.css);
        console.log('index.scss compiled successfully!');

        const profileResult = await sass.compileAsync(path.join(__dirname, 'public/sass/profile.scss'));
        fs.writeFileSync(path.join(__dirname, 'public/css/profile.css'), profileResult.css);
        console.log('profile.scss compiled successfully!');

        // Compile signin.scss
        const signinResult = await sass.compileAsync(path.join(__dirname, 'public/sass/signin.scss'));
        fs.writeFileSync(path.join(__dirname, 'public/css/signin.css'), signinResult.css);
        console.log('signin.scss compiled successfully!');

        // Compile signup.scss
        const signupResult = await sass.compileAsync(path.join(__dirname, 'public/sass/signup.scss'));
        fs.writeFileSync(path.join(__dirname, 'public/css/signup.css'), signupResult.css);
        console.log('signup.scss compiled successfully!');

        // Compile header.scss
        const headerResult = await sass.compileAsync(path.join(__dirname, 'public/sass/header.scss'));
        fs.writeFileSync(path.join(__dirname, 'public/css/header.css'), headerResult.css);
        console.log('header.scss compiled successfully!');

        // Compile footer.scss
        const footerResult = await sass.compileAsync(path.join(__dirname, 'public/sass/footer.scss'));
        fs.writeFileSync(path.join(__dirname, 'public/css/footer.css'), footerResult.css);
        console.log('footer.scss compiled successfully!');

        console.log('All files compiled successfully!');
    } catch (error) {
        console.error('Error compiling SASS:', error.message);
    }
}

// Run the compiler
compileSass();

// Middleware Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Static file serving
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// EJS Layout Setup
app.use(expressEjsLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// View Engine Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

//******use this passport and iske turant baad isko app.use(session) wala *****/
//used for session cookie or to store the users information 
app.use(session({
    name: "meetup",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 40, // Corrected to 40 minutes (previously was incorrectly calculated)
        httpOnly: true, // Protect against cross-site scripting
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        autoRemove: 'interval',
        autoRemoveInterval: 10,
        // Additional connection options
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}));

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());
//is used to make the logged-in user's information available across all views in your application
app.use(passport.setAuthenticatedUser);

//here is the flash messages came from
app.use(flash());
// this is the custom middleware where i have done the setup of flash messagees
app.use(customMiddleware.setFlash);

// Route Imports
const Userroutes = require("./routes/userRoutes");
const Indexroutes = require("./routes/indexRoutes");
const Postroutes = require("./routes/postRoutes");
const Commentroutes = require("./routes/commentRoutes");

// Database Connection
connectDB();

app.use((req, res, next) => {
    res.locals.user = req.user;        
    res.locals.flash = req.flash();    
    next();
});
// Route Usage
app.use("/comment", Commentroutes);
app.use("/user", Userroutes);
app.use("/", Indexroutes);
app.use("/Post", Postroutes);


// Server Initialization
app.listen(port, function(error, data){
    if(error){
        console.log("There is a error");
    }else(console.log("The port is running at:", port));
});