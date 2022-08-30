const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "username cannot be empty"]
    },
    password: {
        type: String,
        required: [true, "password cannot be empty"]
    },
    number_of_playlists: {
        type: Number
    },
    user_id: {
        type: String,
        required: [true, "user id cannot be empty"]
    },
    playlist: {
        type: String,
        required: [true, "playlist cannot be empty"]
    },
    avatar: {
        type: String,
        required: [true, "avatar cannot be empty"]
    },
    isPremium: {
        type: Boolean
    }
},
{ 
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;