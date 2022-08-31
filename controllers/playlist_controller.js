// CONFIGURATION
const express = require("express");
const router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");
// mongoose.Schema.Types.ObjectId.isValid("630f66dd90c1310ef0480e0d");

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ROUTERS

// NEW ROUTE
// GET request for new playlist(s)
router.get("/new", (req, res) => {
    res.render("playlist.ejs")
});

// INDEX ROUTE
// GET request for all playlists in our playlist DB
router.get("/", async (req, res, next) => {
    // if (!mongoose.Schema.Types.ObjectId.isValid(id)) return false;
    try {
        console.log("finding playlist")
        const playlist = await db.Playlist.find(); //figure this line out
        console.log("found playlist")
        const context = {playlist: playlist};
        res.render("playlist.ejs", context);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// SHOW ROUTE
// GET request for one playlist
router.get("/:id", async (req, res, next) => {
    try {
        const onePlaylist = await db.Playlist.findById(req.params.id);
        console.log(onePlaylist);
        const context = {onePlaylist: onePlaylist};
        res.render("playlist.ejs", context);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// CREATE ROUTE
// POST request for adding new playlist(s)
router.post("/", async (req, res, next) => {
    try {
        const createdPlaylist = await db.Playlist.create(req.body);
        console.log(createdPlaylist);
        res.redirect("/playlist");

    } catch (error) {
        console.log(error);
        req.error = error;
        return next ();
    }
});


module.exports = router;