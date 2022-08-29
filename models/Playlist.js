const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({

    playlistname: {
        type: String,
        required: [true, "name of playlist cannot be empty"]
    },
    title: {
        type: String,
        required: [true, "name cannot be empty"]
    },
    album: {
        type: String,
        required: [true, "album cannot be empty"]
    },
    date: {
        type: String,
        required: [true, "date added cannot be empty"]
    },
    duration: {
        type: String,
        required: [true, "duration of song cannot be empty"]
    }
},
{
    timestamps: true
})

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;