const express = require('express');
const port = 5000;

// create an express app
const app = express();

const routers = require('./routes/index');

// accessing any router as per requests in routes folder
app.use('/', routers);

// set view engine
app.set('view engine', 'ejs');
app.set('views', './views');


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