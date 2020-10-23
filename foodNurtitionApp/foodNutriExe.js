const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const request = require('request');
const { json } = require("express");
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
var test = document.querySelector("#submit");
app.get("/", (req, res) => {
    var data;
    console.log(req.query.food);
    console.log(test);
    if (req.query.food) {
        const options = {
            method: 'GET',
            url: 'https://rapidapi.p.rapidapi.com/parser',
            qs: { ingr: `${req.query.food}` },
            headers: {
                'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
                'x-rapidapi-key': '1f98988481mshaf71d0b16041b35p14a73cjsn1e20a5387d6d',
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var useableData = JSON.parse(body);
            data = [useableData];
        });
    }
    //API CALLING
    else {
        res.render("foodNutri", {
            Enerc_Kcal: `${data[0].parsed[0].food.nutrients.Enerc_Kcal}`, //${data[0].parsed[0].food.uri.nutrients}
            PROCNT: `${data[0].parsed[0].food.nutrients.PROCNT}`,
            FAT: `${data[0].parsed[0].food.nutrients.FAT}`,
            FIBTG: `${data[0].parsed[0].food.nutrients.FIBTG}`
        });
    }

});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});