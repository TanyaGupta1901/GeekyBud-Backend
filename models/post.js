const mongoose = require('mongoose')
const plm = require("passport-local-mongoose")

const postSchema = new mongoose.Schema({

    tags : {
        type : Array
    },
    title : {
        type : String
    },
    description : {
        type : String
    },
    user : {
      type : mongoose.Schema.Types.ObjectId
    },
    avatar : {
        type : String
    },
    userName : {
        type : String
    },
    userMail : {
        type : String
    }
    
},{timestamps : true})
postSchema.plugin(plm);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;