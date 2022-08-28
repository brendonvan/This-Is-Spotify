const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
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
    }
},
{
    timestamps: true
})

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;