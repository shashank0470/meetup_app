const User = require("../../../models/user")
const Jwtjsonwebtokens = require("jsonwebtoken")


module.exports.createsession = async(req, res)=>{
    try{
        let user = await User.findOne({email: req.body.email})

        if(!user|| user.password != req.body.password){
            res.json(500, 
                {message: "Invalid usernamea and password"})
        }


        res.json(200, {
            message: "Success in sign in, here is your token, please keep it safe",
            data: {
                token: Jwtjsonwebtokens.sign(user.toJSON(), "MeetUp", {expiresIn: "100000"})
            }
        })
    }
    catch(error){
        console.error("Error", error)
    }
}