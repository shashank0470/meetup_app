const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //this helps to use the something from the user document, matlb agar tuje apni dusre model me ya controller me user ka use karna h to aise type me mongoose.Schema.Types.ObjectId(This field will store MongoDB ObjectIds) and ref me User likna padega.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //imp: the user here is the user which is used in the user model while exporting or that user which is created as model.
        ref: "user",
    },

    //here we added comments so that we can easily access the comment which is done on the post. by using comment here we can directly fetch them.

     //******this field cannot be defined as a single ObjectId, it should be an array of ObjectIds since a post can have multiple comments. Here's the corrected schema: ******/
    comments: [{
        type: mongoose.Schema.Types.ObjectId,                                                                              
        ref: "comment",
    }]
},{
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports= Post;