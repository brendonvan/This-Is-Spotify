// CONFIGURATION
const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../models");
const mongoose = require("mongoose");
require("../config/db.connection");

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ROUTERS

// LIKED SONGS ROUTE
router.get("/liked", async (req, res, next) => {
    try {
        const context = {
            pageName: "Liked",
            playlist: await db.Playlist.findById("63167b9782029db6ab375237"),
            playlists: await db.Playlist.find({})
        }
        res.render("playlist.ejs", context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// CREATE PLAYLIST
router.post("/playlists", async (req, res, next) => {
    try {
        let newPlaylist = await db.Playlist.create({
            name: "New Playlist",
            tracks: [],
            image: "https://imgur.com/IV0wNkj",
            total_duration: "0:00",
            number_of_tracks: 0,
            type: "PLAYLIST"
        })
        res.redirect(`/playlist/${newPlaylist._id}`);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router;