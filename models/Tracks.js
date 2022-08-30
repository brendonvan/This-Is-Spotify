const mongoose = require("mongoose");

const tracksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title cannot be empty"]
    },
    album: {
        type: String,
        required: [true, "album cannot be empty"]
    },
    artists: {
        type: String,
        required: [true, "artists cannot be empty"]
    },
    image: {
        type: String,
        required: [true, "image cannot be empty"]
    },
    number_of_times_played: {
        type: Number,
        required: [true, "number of times played cannot be empty"]
    },
    duration: {
        type: String,
        required: [true, "duration cannot be empty"]
    },
    tracks_id: {
        type: String,
        required: [true, "tracks id cannot be empty"]
    },
    playlist_ids: {
        type: String,
        required: [true, "playlist ids cannot be empty"]
    }
},
{
    timestamps: true
});

const Tracks = mongoose.model("Tracks", tracksSchema);

module.exports = Tracks;