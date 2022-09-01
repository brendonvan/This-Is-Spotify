// CONFIGURATION
const express = require("express");
const router = express.Router();
const db = require("../models");

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ROUTERS
router.get("/", (req, res) => {
    const context = {
        // INSERT HERE
    }
    res.render("home.ejs", context)
})

router.get("/playlist", (req, res) => {
    const context = {
        // INSERT HERE
    }
    res.render("home.ejs", context)
})

router.get("/podcast", (req, res) => {
    const context = {
        // INSERT HERE
    }
    res.render("home.ejs", context)
})

router.get("/artist", (req, res) => {
    const context = {
        // INSERT HERE
    }
    res.render("home.ejs", context)
})

router.get("/album", (req, res) => {
    const context = {
        // INSERT HERE
    }
    res.render("home.ejs", context)
})
router.get("/songs", (req, res) => {
    const context = {
        
    }
})

module.exports = router;