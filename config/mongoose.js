const mongoose = require('mongoose');

// store it in a variable
mongoose.connect('mongodb://localhost/codeconnect_db');

const db = mongoose.Connection;

// if there is any error
db.on('error', console.error.bind(console, 'error connecting to database'));

// if successfull
db.once('open', () => console.log("Database Connected successfully"));