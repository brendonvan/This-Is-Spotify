const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name of playlist cannot be empty"]
    },
    tracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tracks",
        required: [true, "name cannot be empty"],
    }],
    album: {
        type: String,
    },
    image: {
        type: String,
        required: [true, "playlist image cannot be empty"]
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    total_duration: {
        type: String,
        required: [true, "duration cannot be empty"]
    },
    number_of_tracks: {
        type: Number,
        required: [true, "number of tracks cannot be empty"]
    },
    description: {
        type: String
    },
    type: {
        type: String,
        required: [true, "isAlbum cannot be empty"]
    }
},
{
    timestamps: true
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;