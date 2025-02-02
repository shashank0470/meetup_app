const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //this helps to use the something from the user document, matlb agar tuje apni dusre model me ya controller me user ka use karna h to aise type me mongoose.Schema.Types.ObjectId(This field will store MongoDB ObjectIds) and ref me User likna padega.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //imp: the user here is the user which is used in the user model while exporting or that user which is created as model.
        ref: "user",
    }
},{
    timestamps: true
});

const comment = mongoose.model("comment", commentSchema);

module.exports= comment;