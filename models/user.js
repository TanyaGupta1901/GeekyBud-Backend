const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    skillset : {

        type : Array
    },
    posts : {
        type : Array
    },
    password : {
        type : String,
        required : true
    },
    organization : {
        type : String
    },
    designation : {
        type : String
    },
    city :{
        type : String
    },
    linkedin : {
        type : String
    },
    github : {
        type : String
    },
    portfolio : {
        type : String
    },
    twitter : {
        type : String
    },
    img : {
        type : String
    },
    bio : {
        type : String
    }
})
userSchema.plugin(plm)
const User = mongoose.model('User',userSchema);

module.exports = User;