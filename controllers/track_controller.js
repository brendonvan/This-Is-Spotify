// CONFIGURATION
const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../models");
const mongoose = require("mongoose");
require("../config/db.connection");
const SpotifyWebApi = require('spotify-web-api-node');

let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = "http://localhost:8080/callback";

const spotifyApi = new SpotifyWebApi({
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri
})

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ROUTES

// CREATE TRACK ROUTE
router.get("/create/:id", async (req, res, next) => {
    try {
        // DECLARE VARIABLES
        let artistsList = [];

        // GET ACCESS_TOKEN
        const access_token = await getAuth();
        await spotifyApi.setAccessToken(access_token);

        // GET TRACK USING TRACK_ID FROM SPOTIFY API
        let response = await spotifyApi.getTrack(req.params.id);
        let track = response.body;

        // SETUP
        // ARTIST ARRAY
        track.artists.forEach((artist) => {
            artistsList.push(artist.name);
        })
        //DURATION MS TO SECONDS
        let duration = millisToMinutesAndSeconds(track.duration_ms);

        // CREATE NEW TRACK OBJECT FOR MONGODB
        let newTrack = {
            title: track.name,
            album: track.album.name,
            artists: artistsList,
            image: track.album.images[1].url,
            duration: duration,
            tracks_id: track.id,
            release_date: track.album.release_date
        }

        // TODO: IF TRACK IS DOES NOT EXIST CREATE NEW TRACK
        if (true) {
            await db.Tracks.create(newTrack);
        }

        // REDIRECT TO TRACK SHOW PAGE
        res.redirect(`/track/${req.params.id}`);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// SEND PLAYLIST TO TRACK
router.get("/playlists", async (req, res, next) => {
    try {
        const playlists = await db.Playlist.find();

        res.send({ list: playlists});
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// SHOW ROUTE
router.get("/:id", async (req, res, next) => {
    try {
        // FIND TRACK DATA
        const track = await db.Tracks.findOne({tracks_id: req.params.id});

        const context = {
            track: track,
            playlists: await db.Playlist.find({})
        };
        res.render("track.ejs", context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// GET SPOTIFY API ACCESS_TOKEN
// TAKES IN SEARCH INPUT REQUEST AND SENDS LIST OF TRACKS TO REQUEST
router.get('/search/input', async (req, res) => {
    console.log('REQ.QUERY.SEARCH: ' + req.query.search);
    let list = [];
    if (req.query.search !== undefined) {
        list = await searchList(req.query.search);
        res.send({ list: list});
    }
})

// SEARCH FOR TRACKS
async function searchList(search) {
    try {
        console.log('SEARCHLIST SEARCH: ' + search);
        // Give Spotify API Access Token
        const access_token = await getAuth();
        await spotifyApi.setAccessToken(access_token);

        // Search for argument
        const data = await spotifyApi.searchTracks(search)

        // Return Array of tracks
        return data.body.tracks.items;
    } catch (err) {
        console.log(err);
    }
}

// GET ACCESS_TOKEN FROM SPOTIFY
async function getAuth() {
    try{
        // Make post request to SPOTIFY API for access token, sending relavent info
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = new URLSearchParams({'grant_type':'client_credentials'}); // URLSearchParams access the windows.location.search Query
        const response = await axios.post(token_url, data, {
            headers: { 
                // Spotify API documentation requires Base 64 encoded string that contains the client ID and client secret key in a specific format.
                // Buffer provides a way of handling streams of binary data.
                "Authorization":"Basic " + new Buffer.from(`${client_id}:${client_secret}`, "utf-8").toString("base64"), 
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        // console.log('GOT ACCESS_TOKEN: ' + response);
        // console.log(response.data.access_token);  

        // Return Access Token
        return response.data.access_token;
    } catch(error){
      console.log(error);
    }
}

// SPOTIFY API CALLBACK
router.get("/callback", async (req, res) => {
    console.log(getAuth());
    res.render("home.ejs")
});

// MS TO SEC FUNCTION
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

module.exports = router;