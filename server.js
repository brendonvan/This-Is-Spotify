// CONFIGURE
const express = require("express");
const app = express();
const PORT = 8080;
let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = "http://localhost:8080/callback";

// IMPORT
const controller = require("./controllers");
const methodOverride = require("method-override");

// MIDDLEWARE
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// CONTROLLERS
app.use("", controller.home);
app.use("/playlist", controller.playlist);
app.use("/collection", controller.collection);
app.use("/search", controller.search);

// ERROR 404 PAGE
app.get("*", (req, res) => {
    res.render("404.ejs")
})
// HELP PAGE
app.get("/help", (req, res) =>{
    res.render("help.ejs")
})

// GET SPOTIFY API ACCESS_TOKEN
app.get("/search/api", (req, res) => {
    res.send("GOT INFO")
})

async function getAuth () {
    try{
        // POST TO SPOTIFY TO GET ACCESS_TOKEN
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = new URLSearchParams({'grant_type':'client_credentials'}).toString(); 
        const response = await axios.post(token_url, data, {
        headers: { 
            "Authorization": "Basic " + new Buffer.from(`${client_id}:${client_secret}`, "utf-8").toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded"
        }
        })

        // RETURN ACCESS_TOKEN
        return response.data.access_token;
    
    } catch(error){
        console.log(error);
    }
}

async function handleSearch(search) {
    let results = [];
    const access_token = await getAuth();
    // console.log(typeof access_token);
    spotifyApi.setAccessToken(access_token);
    spotifyApi.searchTracks('Blackbear')
    .then(function(data) {
        console.log('Search by "Blackbear"', data.body.tracks);
        return data.body.tracks;
    }, function(err) {
        console.error(err);
    });
}

// module.exports = getAuth;

// LISTENING
app.listen(PORT, () => { console.log(`Server listening on PORT: ${PORT}`)});