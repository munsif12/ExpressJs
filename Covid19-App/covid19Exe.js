const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
//setting up assets to load
const pathToAssets = path.join(__dirname, "/assets");
app.use(express.static(pathToAssets));
//setting up partials
const pathToPartials = path.join(__dirname, "/partials");
hbs.registerPartials(pathToPartials);
//setting up viewEngine => hbs viewEngine
app.set("view engine", "hbs");
//setting up home page
app.get("/", (req, res) => {
    res.render("covid19App");
});
app.get("*", (req, res) => {
    res.send("404 Error page");
});
//setting up server to listen
app.listen("8000", () => {
    console.log("server started");
});