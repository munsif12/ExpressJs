const express = require("express");
const hbs = require("hbs");
const path = require("path");
const requests = require("requests");
const app = express();
const port = "8000";
//settting up view engine which is hbs #handlebars
app.set("view engine", "hbs");
//setting up path for view engine default folder
const pathViews = path.join(__dirname, "/viewsMyviews");
app.set("views", pathViews);
//setting up partials components path
const pathPartials = path.join(__dirname, "/partials");
hbs.registerPartials(pathPartials);
//setting up asset folder for static files like css/js
var PathAssets = path.join(__dirname, "/assets");
app.use(express.static(PathAssets));
//setting up server requests
app.get("/", (req, res) => {
    res.render("home", {
        mainTopic: "Query string Url Parameters",
        topic: "Query/home",
        pageName: path.basename((path.join(__dirname, "/myViews/index.hbs"))),
        userName: req.query.userName,
        shoping: req.query.shoping,
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        mainTopic: "Query string Url Parameters",
        topic: "Query/home",
        pageName: path.basename((path.join(__dirname, "/myViews/about.hbs"))),
        userName: req.query.userName,
        shoping: req.query.shoping,
    });
});
app.get("/weather", (req, res) => {
    var temp;
    if (req.query.cityName) {
        requests(
            `http://api.openweathermap.org/data/2.5/weather?q=${req.query.cityName}&appid=7428d86cddd52bb1813e331885cc6b27`
        )
            .on("data", (chunk) => {
                const objdata = JSON.parse(chunk);
                //converting object of js into array means (array of an object)
                const wetArray = [objdata];
                temp = wetArray[0].main.temp;
                console.log(`city name is ${wetArray[0].name} and temp is ${wetArray[0].main.temp}`);
            })
            .on("end", (err) => {
                if (err) {
                    // res.end(err);
                    return console.log('connection error' + err);
                }
                res.end();
            });
    }
    res.render("weather", {
        mainTopic: "Query string and API ",
        topic: "Query/weather",
        pageName: path.basename((path.join(__dirname, "/viewsMyviews/weather.hbs"))),
        userName: req.query.cityName
    });
});
app.get("*", (req, res) => {
    res.render("errorPage", {
        mainTopic: "Query string Url Parameters",
        topic: "Query/errorPage"
    });
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
