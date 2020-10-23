const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const request = require('request');
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

    res.render("foodNutri", {
        Enerc_Kcal: "22",
        PROCNT: "11",
        FAT: "19.3",
        FIBTG: "4.02"
    });
    //API CALLING
    const options = {
        method: 'GET',
        url: 'https://rapidapi.p.rapidapi.com/parser',
        qs: { ingr: `${req.url.food}` },
        headers: {
            'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
            'x-rapidapi-key': '1f98988481mshaf71d0b16041b35p14a73cjsn1e20a5387d6d',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
    console.log(req.query.food);
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});