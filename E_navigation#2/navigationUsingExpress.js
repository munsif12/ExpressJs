/**
 * no need to create a server expressJs will automat.. do it for u.
 */
var express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("this is home page");
});
app.get('/services', (req, res) => {
    /*send() automatically sets the Content-Length HTTP response header.
    send() also automatically closes the connection. */
    // 2:
    /**If you pass in a string, it sets the Content-Type header to text/html.
    if you pass in an object or an array, it sets the application/json Content-Type header,
    and parses that parameter into JSON. */
    res.status(200).send("this is services page");
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