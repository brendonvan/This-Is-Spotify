// CONFIGURATION
const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../models");
const mongoose = require("mongoose");
require("../config/db.connection");

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true}));

// ROUTERS
router.get("/", async (req, res) => {
    try {
        const context = {
            pageName: "Search",
            playlists: await db.Playlist.find({})
        }
        res.render("search.ejs", context);
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
    
})

module.exports = router;