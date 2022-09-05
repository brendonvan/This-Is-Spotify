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

router.get("/playlists", async (req, res, next) => {
    try {
        const context = {
            pageName: "Playlists",
            playlists: await db.Playlist.find({})
        }
        res.render("collection_playlists.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.get("/liked", async (req, res, next) => {
    try {
        const context = {
            pageName: "Liked",
        }
        res.render("collection_liked.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.post("/playlists", async (req, res, next) => {
    try {
        // when name is created
        // create new playlist object on mongoDB with just name

        await db.Playlist.create({
            name: req.body.name_of_playlist,
            tracks: [],
            image: "https://picsum.photos/200/",
            total_duration: "0:00",
            number_of_tracks: 0,
            type: "PLAYLIST"
        })
        res.redirect("/collection/playlists")
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})



module.exports = router;