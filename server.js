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

// ERROR 404 PAGE
app.get("*", (req, res) => {
    res.render("404.ejs")
})
// HELP PAGE
app.get("/help", (req, res) =>{
    res.render("help.ejs")
})

// LISTENING
app.listen(PORT, () => { console.log(`Server listening on PORT: ${PORT}`)});