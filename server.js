// CONFIGURE
const express = require("express");
const app = express();
const PORT = 8080;

// IMPORT
const homeController = require("./controllers/home_controller");
const playlistController = require("./controllers/playlist_controller");
const collectionController = require("./controllers/collection_controller");
const searchController = require("./controllers/search_controller");
const methodOverride = require("method-override");

// MIDDLEWARE
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// CONTROLLERS
app.use("", homeController);
app.use("/playlist", playlistController);
app.use("/collection", collectionController);
app.use("/search", searchController);

// LISTENING
app.listen(PORT, () => { console.log(`Server listening on PORT: ${PORT}`)});