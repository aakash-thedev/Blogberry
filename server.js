const express = require('express');
// create an express app
const app = express();
const port = 5000;

const expressLayouts = require('express-ejs-layouts');

app.use('*/assets', express.static('./assets'));

const db = require('./config/mongoose');

// to use layouts
app.use(expressLayouts);

// layouts ki styling ke alawa agar individual pages ki styling krni ho
// tb style aur script tags ko unki respective sahi positions me hi rkhne ke liye
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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