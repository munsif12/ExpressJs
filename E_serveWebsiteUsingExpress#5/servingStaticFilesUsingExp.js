const express = require("express");
const path = require("path");
const app = express();
// Method 1 to add static files using Express middleware :- 
app.use(express.static("assets"));
// app.use(express.static("assets/css"));

//Method 2 to add static files using Express middleware :-
// console.log(path.join(__dirname, "/assets"));
// const assetsPath = path.join(__dirname, "/assets");
// app.use(express.static(assetsPath));
//serving requests and sending response 
app.get("/", (req, res) => {
    res.send("Welcome! this is home page");
});
app.get('/services', (req, res) => {
    //res.write("<h1>this is contect page</h1>");
    res.write('<h1 style="color:blue; text-align:center;">This is Services page</h1>');
    res.write('<h3 style="text-align:center;">or is page ka maqsad ya check krna tha ka JavaScript k static files Express k live server ma kam karte h k nhi.</h3>');
    res.send();
});
// creating server to listen to the request 
app.listen('8000', () => {
    console.log("listening to server request on port no 8000");
});
