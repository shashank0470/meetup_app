const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
    },

    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //Unlike the regular ref option which points to a specific model, refPath allows the referenced model to be determined dynamically.
        refPath: "onModel"
    },

    onModel: {
        type: String,
        required: true,
        // Restricts values to only "Post" or "comment"
        enum: ["Post","comment"]

    }
},  {timestamps: true})


const Like = mongoose.model("Like", likeSchema)

module.exports = Like