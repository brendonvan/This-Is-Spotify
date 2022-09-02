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

// NEW ROUTE
// GET request for new tracks(s)
router.get("/create/:id", async (req, res, next) => {
    try {
        const access_token = await getAuth();
        await spotifyApi.setAccessToken(access_token);
        console.log(req.params.id);

        let track = await spotifyApi.getTrack(req.params.id);
        // console.log("Track Name: " + track)
        let artistsList = [];

        track.body.artists.forEach((artist) => {
            artistsList.push(artist.name);
        })

        let duration = millisToMinutesAndSeconds(track.body.duration_ms);
        let newTrack = {
            title: track.body.name,
            album: track.body.album.name,
            artists: artistsList,
            image: track.body.album.images[1].url,
            duration: duration,
            tracks_id: track.body.id,
            release_date: track.body.album.release_date
        }
        db.Tracks.find( {$and: [ {tracks_id: req.params.id}, {track_id: { $exists: false }} ]}, (err, track) => {
            console.log(track)
        });

        // If track does not exist in our database run vvvv
        await db.Tracks.create(newTrack);

        
        res.redirect(`/track/${req.params.id}`);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// INDEX ROUTE
// GET request for all playlists in our playlist DB
router.get("/", async (req, res, next) => {
    try {
        const playlist = await db.Playlist.find();
        const context = {playlistlist: playlist};
        res.render("track.ejs", context);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

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
// GET request for one playlist
router.get("/:id", async (req, res, next) => {
    try {
        const track = await db.Tracks.findOne({tracks_id: req.params.id});
        
        console.log(track);
        const context = {
            track: track
        };
        res.render("track.ejs", context);

        // create add button to playlist
        // will show all playlist user owns 
        

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
        res.redirect("/track");

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
        return res.redirect("/track");

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
        res.redirect("/track");

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// EDIT ROUTE
// GET request for editing playlist template

router.get("/:id/edit", async (req, res, next) => {
    try {
        const editedPlaylist = await db.Playlist.findById(req.params.id);
        console.log(editedPlaylist);
        const context = {playlist: editedPlaylist};
        res.render("track.ejs", context);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// GET SPOTIFY API ACCESS_TOKEN
router.get("/auth", (req, res) => {
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