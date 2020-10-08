var express = require("express");
var path = require("path");
var hbs = require("hbs");
var app = express();
//setting view engine for express and i am using ( HBS ) view engine insted of pug,mustache
app.set("view engine", "hbs");
//giveing path to builtin viewsMyvies to identify .hbs files
var relPathViews = path.join(__dirname, "/viewsMyviews");
app.set("views", relPathViews);
//setting up the partials folder
var relPathPartials = path.join(__dirname, "/partials");
hbs.registerPartials(relPathPartials);
//setting up static files
var relPathAssets = path.join(__dirname, "/assets");
app.use(express.static(relPathAssets));
//setting up server home page
app.get("/", (req, res) => {
    res.render("home", {
        topic: "Partials"
    })
});
app.get("/about", (req, res) => {
    res.render("about", {
        topic: "Partials About"
    })
});
app.listen("8000", () => {
    console.log("listening to requests");
})