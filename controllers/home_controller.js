// CONFIGURATION
const express = require("express");
const router = express.Router();

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true}));

// ROUTERS
router.get("/", (req, res) => {
    const context = {
        // INSERT HERE
    }
    res.render("home.ejs", context)
})

//LIKED SONGS
router.get("/liked", (req, res) => {
    const context = {
        // INSERT HERE
    }
    res.render("liked.ejs", context)
})

//TRACKS
router.get("/tracks", (req, res) => {
    const context = {
        // INSERT HERE
    }
    res.render("tracks.ejs", context)
})

module.exports = router;


// EXPORT
module.exports = router;