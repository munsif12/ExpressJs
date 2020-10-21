const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const requests = require("requests");
const app = express();
const port = 8000;
//setting up view engine
app.set("view engine", "hbs");
//setting up views folder
const pathViews = path.join(__dirname, "/views");
app.set("views", pathViews);
//registering partials
hbs.registerPartials(path.join(__dirname, "/partials"));
//Loading static files
app.use(express.static(path.join(__dirname, "/assets")));
//reading file
const readFile = fs.readFileSync(`${pathViews}/foodNutri.hbs`, "utf-8");
const setValues = (readFile, val) => {
    let returndata = readFile.replace("{%FAT%}", (val[0].parsed[0].nutrients.FAT));
    return returndata;
}
app.get("/", (req, res) => {
    // res.render("foodNutri");
    const options = {
        "method": "GET",
        "hostname": "rapidapi.p.rapidapi.com",
        "port": null,
        "path": `/parser?ingr=apple`,
        "headers": {
            "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
            "x-rapidapi-key": "1f98988481mshaf71d0b16041b35p14a73cjsn1e20a5387d6d",
            "useQueryString": true
        }
    };
    requests(options).on("data", function (chunk) {
        const objdata = JSON.parse(chunk);
        const wetArray = [objdata];
        const apiData = wetArray.map(val => {
            console.log(wetArray[0].parsed[0].nutrients.FAT);
            settingValues(readFile, val)
        }).join("");
        res.write(apiData);
    }).on("end", function () {
        if (err) {
            // res.end(err);
            return console.log('connection error' + err);
        }
        res.end();
    });

    req.end();
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});