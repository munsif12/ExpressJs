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
        mainTopic: "Handeling 404 error page",
        topic: "Error 404 home"
    })
});
app.get("/about", (req, res) => {
    res.render("about", {
        mainTopic: "Handeling 404 error page",
        topic: "Error 404 About"
    })
});
// exp => localhost:8000/contect =>contect not exist in server and show the 404 error
app.get("*", (req, res) => { // (*) uper mention ke hui pages(home,about pages) k elawa koi b page access horha hoto eror page show hoga
    res.render("errorPage", {
        mainTopic: "Handeling 404 error page",
        topic: "404 page error/* "
    })
});
// exp => localhost:8000/home/anypage =>contect not exist in server and show the 404 error
app.get("/about/*", (req, res) => {
    res.render("errorPage", {
        mainTopic: "Handeling 404 error page",
        topic: "404 error/about/"
    })
});
app.listen("8000", () => {
    console.log("listening to requests");
});