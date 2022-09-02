// CONFIGURE
require('dotenv').config();
const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3002;
let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = "https://this-is-spotifyy.herokuapp.com/callback";

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
app.get("/auth", (req, res) => {
    res.send({
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri
    })
})

app.get("/callback", async (req, res) => {
    // getAuth();
    console.log(getAuth());
    res.render("home.ejs")
});

app.get('/search/input', async (req, res) => {
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
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = new URLSearchParams({'grant_type':'client_credentials'});
        const response = await axios.post(token_url, data, {
        headers: { 
            "Authorization":"Basic " + new Buffer.from(`${client_id}:${client_secret}`, "utf-8").toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    // console.log('GOT ACCESS_TOKEN: ' + response);
    // console.log(response.data.access_token);  

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

// ERROR 404 PAGE
app.get("*", (req, res) => {
    res.render("404.ejs")
})

// LISTENING
app.listen(PORT, () => { console.log(`Server listening on PORT: ${PORT}`)});