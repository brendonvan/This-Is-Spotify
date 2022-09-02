// CONFIGURATION
const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../models");
const mongoose = require("mongoose");
require("../config/db.connection");
var SpotifyWebApi = require('spotify-web-api-node');

let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = "https://this-is-spotifyy.herokuapp.com/callback";

const spotifyApi = new SpotifyWebApi({
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri
})

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ROUTERS
router.get("/", async (req, res, next) => {
    try {
        const context = {
            pageName: "Home"
        }
        res.render("collection.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.get("/albums", async (req, res, next) => {
    try {
        const context = {
            pageName: "Albums"
        }
        res.render("collection.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.get("/tracks", async (req, res, next) => {
    try {
        const context = {
            pageName: "Tracks"
        }
        res.render("collection.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.get("/genres", async (req, res, next) => {
    try {
        const context = {
            pageName: "Genres"
        }
        res.render("collection.ejs", context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

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
        res.render("playlist.ejs", context)
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

// GET SPOTIFY API ACCESS_TOKEN
router.get("/auth", async (req, res) => {
    res.send({
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri
    })
})

router.get("/callback", async (req, res) => {
    // getAuth();
    console.log(getAuth());
    res.render("home.ejs")
});

router.get('/search/input', async (req, res) => {
    // const authTest = await getAuth()
    // console.log(searchList());
    // console.log(typeof searchList());
    console.log('REQ.QUERY.SEARCH: ' + req.query.search);
    let list = [];
    if (req.query.search !== undefined) {
        list = await searchList(req.query.search);
        res.send({ list: list});
    }
})



// GET ACCESS_TOKEN
async function getAuth() {
    try{
        //make post request to SPOTIFY API for access token, sending relavent info
        console.log("Get Auth");
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = new URLSearchParams({'grant_type':'client_credentials'});
        const response = await axios.post(token_url, data, {
        headers: { 
            "Authorization":"Basic " + new Buffer.from(`${client_id}:${client_secret}`, "utf-8").toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    console.log('GOT ACCESS_TOKEN: ' + response);
    console.log(response.data.access_token);  

    //return access token
    return response.data.access_token;
    
    } catch(error){
      console.log(error);
    }
}

async function searchList(search) {
    try {
        let results = [];
        const access_token = await getAuth();
    
        console.log('SEARCHLIST SEARCH: ' + search);
    
        // console.log(typeof access_token);
        await spotifyApi.setAccessToken(access_token);
        const data = await spotifyApi.searchTracks(search)
        // console.log(data.body.tracks.items)
        return data.body.tracks.items;
    } catch (err) {
        console.log(err);
    }
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

module.exports = router;