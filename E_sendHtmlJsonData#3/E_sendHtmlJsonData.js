var express = require('express');
var app = express();

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

    res.send("this is services page");
});
app.get('/contect', (req, res) => {
    //  [ sending data as html ] 
    //write() method is use to send multiple html lines of data 
    //but does,nt close the connection (page refreshes continuesly)
    //so we must have to close the response by res.send();

    // If you pass in a string, it sets the Content-Type header to text/html.
    res.write('<h1 style="color:lightblue;">[ Sending data as HTML on response ]</h1>');
    res.write("<h1>this is contect page</h1>");
    res.write("<h1>Using write method twice :) </h1>");
    res.send();

});
app.get('/about', (req, res) => {
    //[ sending data as JSON ] use 2 method [ 1=> res.send()  2=>res.json() ] 
    /* if you pass in an object or an array, it sets the application/json Content-Type header,
    and parses that parameter into JSON. */
    /* 1 object or Array of objects */
    //if u want to send array  of objects then just add brackets [] before parantheses {}

    /*It sends a JSON response. This method is identical to res.send() 
    when an object or array is passed,but it also converts non-objects ( such as
    null and undefined,which are not valid data )  to json. */

    //method 1 => res.send(); 

    /*
    res.send([{
        id: 1,
        name: "Munsif",
        class: "BSCS-6A",
    },
    {
        id: 2,
        name: "Kazmii",
        class: "BSCS-6A",
    }
    ]);
    */

    //Method 2 => res.json();
    res.json([{
        id: 1,
        name: "munsif",
        class: "BSCS-6A",
        phoneNo: {
            pZong: {
                pId1: 1,
                pNo: '0313-43234'
            },
            pTel: {
                pId: 2,
                pNo: '0345-434342'
            }
        }
    },
    {
        id: 2,
        name: "Hamza",
        class: "BSCS-6A",
        phoneNo: {
            pUfone: {
                pId1: 1,
                pNo: '0333-43234'
            },
            pZong: {
                pId: 2,
                pNo: '0345-434342'
            }
        }
    },
    {
        id: 3,
        name: "Kazmii",
        class: "BSCS-6A",
        phoneNo: {
            pTel: {
                pId1: 1,
                pNo: '0344-43234'
            },
            pZong: {
                pId: 2,
                pNo: '0316-434342'
            }
        }
    }
    ]);
});
//liste to the port where req is comming
app.listen('8000', () => {
    console.log('listening onport 8000');
});