// CONFIGURE
require('dotenv').config();
const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 8080;
let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = "https://streamify.fly.dev/";

const spotifyApi = new SpotifyWebApi({
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri
})

// IMPORT
const controller = require("./controllers");
const methodOverride = require("method-override");

// MIDDLEWARE
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// CONTROLLERS
app.use("", controller.home);
app.use("/track", controller.track);
app.use("/playlist", controller.playlist);
app.use("/collection", controller.collection);
app.use("/search", controller.search);

// HELP PAGE
app.get("/help", (req, res) =>{
    res.render("help.ejs")
})

// GET SPOTIFY API ACCESS_TOKEN

// TAKES IN SEARCH INPUT REQUEST AND SENDS LIST OF TRACKS TO REQUEST
app.get('/search/input', async (req, res) => {
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
        const data = await spotifyApi.searchTracks(search);
        
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
app.get("/callback", async (req, res) => {
    console.log(getAuth());
    res.render("home.ejs")
});

// ERROR 404 PAGE
app.get("*", (req, res) => {
    res.render("404.ejs")
})

// LISTENING
app.listen(PORT, () => { console.log(`Server listening on PORT: ${PORT}`)});