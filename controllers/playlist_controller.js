// CONFIGURATION
const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../models");
const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId
require("../config/db.connection");

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ROUTERS

// ADD TRACK TO PLAYLIST - UPDATE ROUTE
router.put("/:playlistId/add/:trackId", async (req, res, next) => {
    try {
        // FIND TRACK AND PLAYLIST IN MONGODB
        let foundTrack = await db.Tracks.findOne({ tracks_id: req.params.trackId});
        let foundPlaylist = await db.Playlist.findById(req.params.playlistId);

        // console.log("FOUND TRACK " + foundTrack);
        // console.log("FOUND PLAYLIST " + foundPlaylist);
        
        // PUSH TRACK INTO PLAYLIST ARRAY
        foundPlaylist.tracks.push(foundTrack);
        
        // UPDATE PLAYLIST
        await db.Playlist.findByIdAndUpdate(req.params.playlistId, foundPlaylist);

        // REDIRECT TO PLAYLIST
        res.redirect(`/playlist/${req.params.playlistId}`);
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        let context = {};
        let foundTracks = [];
        let foundPlaylist = await db.Playlist.findById(req.params.id)
        foundPlaylist.tracks.forEach( async (trackObjectId) => {
            let track = await db.Tracks.findOne({ _id: trackObjectId});
            foundTracks.push(track);
            
        })
        
        setTimeout(() => {
            context = {
                pageName: "Playlists",
                playlist: foundPlaylist,
                playlistItems: foundTracks
            }
            res.render("playlist.ejs", context)
        }, 500)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

module.exports = router;