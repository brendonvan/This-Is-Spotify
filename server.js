// CONFIGURE
const express = require("express");
const app = express();
const PORT = 8080;

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

// LISTENING
app.listen(PORT, () => { console.log(`Server listening on PORT: ${PORT}`)});