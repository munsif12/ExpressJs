const express = require("express");
const path = require('path');
const app = express();
//to add staticc files like css/js
const relPath = path.join(__dirname, '/assets');
console.log(relPath);
app.use(express.static(relPath));

//toset the view engine like ( hbs ,pug, mustaches ) we are using => hbs
app.set("view engine", "hbs");
app.get("/", (req, res) => {
    //render method will check for theviews folder in the root and then execute the index files
    /*  *** for displaying dynamic contect using hbs 
    u must have to have a ( Views folder) in your directory ***   */
    /*  we can send dynamic cont using js object but the
     objects key has to b same in html.hbs file where we want to store data dynamically  */
    res.render("index.hbs", { //(filename,dynamic data)
        name: "Munsif"
    });
})
app.get('/about', (req, res) => {
    res.render("about.hbs", {
        name: "Munsif",
        about: "Learning Express"
    });
});
app.listen("8000", () => {
    console.log("listening port 8000");
})