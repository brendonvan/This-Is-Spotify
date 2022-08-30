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
    res.render("search.ejs", context)
})

module.exports = router;