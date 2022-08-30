const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({

    name_of_playlist: {
        type: String,
        required: [true, "name of playlist cannot be empty"]
    },
    tracks: {
        type: [{String}], // fix this object later
        required: [true, "name cannot be empty"]
    },
    album: {
        type: String,
        required: [true, "album cannot be empty"]
    },
    image: {
        type: String,
        required: [true, "playlist image cannot be empty"]
    },
    created_date: {
        type: String,
        required: [true, "date added cannot be empty"]
    },
    duration_of_entire_playlist: {
        type: String,
        required: [true, "duration of song cannot be empty"]
    },
    number_of_tracks: {
        type: Number,
        required: [true, "number of tracks cannot be empty"]
    },
    number_of_users_following: {
        type: Number
    },
    playlist_id: {
        type: String,
        required: [true, "playlist id cannot be empty"]
    },
    track_ids: {
        type: String,
        required: [true, "track ids cannot be empty"]
    },
    user_id: {
        type: String,
        required: [true, "user id cannot be empty"]
    },
    description: {
        type: String
    },
    isAlbum: {
        type: Boolean,
        required: [true, "isAlbum cannot be empty"]
    }
},
{
    timestamps: true
})

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;