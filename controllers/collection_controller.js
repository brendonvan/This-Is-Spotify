// CONFIGURATION
const express = require("express");
const router = express.Router();
const db = require("../models");

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ROUTERS
router.get("/", (req, res, next) => {
    try {
        const context = {
            // INSERT HERE
        }
        res.render("collection.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.get("/albums", (req, res, next) => {
    try {
        const context = {
            // INSERT HERE
        }
        res.render("collection.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.get("/tracks", (req, res, next) => {
    try {
        const context = {
            // INSERT HERE
        }
        res.render("collection.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.get("/genres", (req, res, next) => {
    try {
        const context = {
            // INSERT HERE
        }
        res.render("collection.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.get("/playlists", (req, res, next) => {
    try {
        const context = {
            // INSERT HERE
        }
        res.render("collection.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.get("/liked", (req, res, next) => {
    try {
        const context = {
            // INSERT HERE
        }
        res.render("collection.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

module.exports = router;