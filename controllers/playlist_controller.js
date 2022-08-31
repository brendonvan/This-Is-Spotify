// CONFIGURATION
const express = require("express");
const router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");
require("../config/db.connection");

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ROUTES

// NEW ROUTE
// GET request for new playlist(s)
router.get("/new", (req, res) => {
    res.render("playlist.ejs")
});

// INDEX ROUTE
// GET request for all playlists in our playlist DB
router.get("/", async (req, res, next) => {
    try {
        const playlist = await db.Playlist.find();
        const context = {playlistlist: playlist};
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
        console.log("Here " + onePlaylist);
        const context = {playlist: onePlaylist};
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

// DESTROY ROUTE
// DELETE request for removing one playlist from playlist DB

router.delete("/:id", async (req, res, next) => {
    try {
        const deletedPlaylist = await db.Playlist.findByIdAndDelete(req.params.id);
        console.log(deletedPlaylist);
        return res.redirect("/playlist");

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// UPDATE ROUTE
// PUT request for playlist updates

router.put("/:id", async (req, res, next) => {
    try {
        const updatedPlaylist = await db.Playlist.findByIdAndUpdate(req.params.id, req.body);
        console.log(updatedPlaylist);
        res.redirect("/playlist");

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// EDIT ROUTE
// GET request for editing playlist template

// router.get("/:id/edit", async (req, res, next) => {
//     try {
//         const editedPlaylist = await db.Playlist.findById(req.params.id);
//         console.log(editedPlaylist);
//         const context = {playlist: editedPlaylist};
//         res.render("playlist.ejs", context);

//     } catch (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//     }
// });


module.exports = router;