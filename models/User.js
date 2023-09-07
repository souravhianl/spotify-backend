const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
 
    lastName:{
        type:String,
        required:true
    },


    email:{
        type:String,
        required:true

    },

    userName:{
        type:String,
        required:true
    },

    likedSongs:{
        type:String,
        default:""
    },

    likedPlaylist:{
        type:String,
        default:""
    },

    subscribedArtist:{
        type:String,
        default:""
    }
})

const Usermodel = mongoose.model("User",User);
module.exports = Usermodel;