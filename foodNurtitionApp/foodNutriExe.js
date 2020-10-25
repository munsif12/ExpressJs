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
const readFile = fs.readFileSync(`${__dirname}/partials/body.hbs`, "utf-8");
//console.log(readFile);
app.get("/", (req, res) => {
    var data;
    if (req.query.food) {
        const url = {
            method: 'GET',
            url: 'https://rapidapi.p.rapidapi.com/parser',
            qs: { ingr: `${req.query.food}` },
            headers: {
                'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
                'x-rapidapi-key': '1f98988481mshaf71d0b16041b35p14a73cjsn1e20a5387d6d',
                useQueryString: true
            }
        };

        request(url, function (error, response, body) {
            if (error) throw new Error(error);
            var useableData = JSON.parse(body);
            data = [useableData];
            console.log(data[0].parsed[0].food.nutrients);
            console.log(data[0].parsed[0].food.image);
            // console.log(readFile.replace("{%PROCNT%}", (data[0].parsed[0].food.nutrients.Enerc_Kcal)));
            // readFile.replace("{%PROCNT%}", (data[0].parsed[0].food.nutrients.Enerc_Kcal));
            res.render("foodNutri", {
                imageUrl: `${data[0].parsed[0].food.image}`,
                lable: `${data[0].parsed[0].food.label}`,
                Enerc_Kcal: `${data[0].parsed[0].food.nutrients.ENERC_KCAL}`, //${data[0].parsed[0].food.uri.nutrients}
                PROCNT: `${data[0].parsed[0].food.nutrients.PROCNT}`,
                FAT: `${data[0].parsed[0].food.nutrients.FAT}`,
                CHOCDF: `${data[0].parsed[0].food.nutrients.CHOCDF}`
            });
        });

    }
    //API CALLING


});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});