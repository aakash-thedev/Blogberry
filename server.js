const express = require('express');
const port = 5000;

// create an express app
const app = express();

const routers = require('./routes/index');

// adding an middleware to load routers first
app.use('/', routers);


// create a home route
app.get('/', (req, res) => {
    return res.end('<h1> Server Running </h1>');
});


// fire up the server on the port
app.listen(port, (err)   => {

        if(err){
            console.log(`Error : ${error}` );
            return;
        }

        console.log(`codeconnet running on : ${port}`);;
        return;
    }
);