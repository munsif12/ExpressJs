const express = require('express');
const path = require('path');
const app = express();

//using express middle ware only to server static files
var absolutePath = path.join(__dirname, "/assets");
app.use(express.static(absolutePath));

app.get('/', (req, res) => {
    res.send("this is home page");
});
app.get('/contect', (req, res) => {
    res.send("this is contect page");
});
app.get('/about', (req, res) => {
    res.send("this is about page");
});
//liste to the port where req is comming
app.listen('8000', () => {
    console.log('listening onport 8000');
});