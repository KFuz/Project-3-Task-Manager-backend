const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    Content:{
        type:String,
        required:true
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Task:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required:true
    }
},
{timestamps:true})

module.exports = mongoose.model("Comment", commentSchema)