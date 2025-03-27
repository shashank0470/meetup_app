module.exports.setFlash = async(req, res, next) =>{
    //Variables stored here are available to your views during that request-response cycle.
    res.locals.flash ={
        "success" : req.flash("success"),
        "error": req.flash("error"),
    }

    // Pass control to the next middleware or route handler
    next();
}



// Controller sets message → req.flash('success', 'message')
// ↓
// Middleware stores it → res.locals.flash.success
// ↓
// View accesses it → flash.success  