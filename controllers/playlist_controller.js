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
// SHOW PAGE
router.get("/:id", async (req, res, next) => {
    try {
        let context = {};
        let foundTracks = [];
        let foundPlaylist = await db.Playlist.findById(req.params.id);
        foundPlaylist.tracks.forEach( async (trackObjectId) => {
            let track = await db.Tracks.findOne({ _id: trackObjectId});
            foundTracks.push(track);
        })
        
        setTimeout(async () => {
            context = {
                pageName: "Playlists",
                playlist: foundPlaylist,
                playlistItems: foundTracks,
                playlists: await db.Playlist.find({})
            }
            res.render("playlist.ejs", context);
        }, 500)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// EDIT PAGE
router.get("/:id/edit", async (req, res, next) => {
    try {
        let context = {};
        let foundTracks = [];
        let foundPlaylist = await db.Playlist.findById(req.params.id);
        foundPlaylist.tracks.forEach( async (trackObjectId) => {
            let track = await db.Tracks.findOne({ _id: trackObjectId});
            foundTracks.push(track);
        })
        
        setTimeout(async () => {
            context = {
                pageName: "Playlists",
                playlist: foundPlaylist,
                playlistItems: foundTracks,
                playlists: await db.Playlist.find({})
            }
            res.render("playlist_edit.ejs", context);
        }, 500)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// SAVE EDIT 
router.put("/:id/edit", async (req, res, next) => {
    try {
        await db.Playlist.findByIdAndUpdate(req.params.id, { name: req.body.playlistName })
        res.redirect(`/playlist/${req.params.id}`);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// ADD TRACK TO PLAYLIST - UPDATE ROUTE
router.put("/:playlistId/add/:trackId", async (req, res, next) => {
    try {
        // FIND TRACK AND PLAYLIST IN MONGODB
        let foundTrack = await db.Tracks.findOne({ tracks_id: req.params.trackId});
        let foundPlaylist = await db.Playlist.findById(req.params.playlistId);
        
        // PUSH TRACK INTO PLAYLIST ARRAY
        foundPlaylist.tracks.push(foundTrack);
        
        // UPDATE PLAYLIST
        await db.Playlist.findByIdAndUpdate(req.params.playlistId, foundPlaylist);

        // REDIRECT TO PLAYLIST
        res.redirect(`/playlist/${req.params.playlistId}`);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// DELETE ROUTE FOR TRACK
router.put("/:playlistId/delete/:trackId", async (req, res, next) => {
    try {
        const foundPlaylist = await db.Playlist.findById(req.params.playlistId);
        const foundTrack = await db.Tracks.findById(req.params.trackId);

        foundPlaylist.tracks.splice(foundPlaylist.tracks.indexOf(req.params.trackId), 1);

        await db.Playlist.findByIdAndUpdate(req.params.playlistId, {tracks: foundPlaylist.tracks});

        return res.redirect(`/playlist/${req.params.playlistId}`);
    } catch (error) {
      console.log(error);
      req.error = error;
      return next();
    }
});

// DELETE ROUTE FOR PLAYLIST
router.delete("/:playlistId", async (req, res, next) => {
    try {
        await db.Playlist.findByIdAndDelete(req.params.playlistId);
        res.redirect("/");
    } catch (error) {
      console.log(error);
      req.error = error;
      return next();
    }
});

module.exports = router;