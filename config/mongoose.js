const mongoose = require('mongoose');

// store it in a variable
mongoose.connect('mongodb://localhost/codeconnect_db', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// if there is any error
db.on('error', console.error.bind(console, 'error connecting to database'));

// if successfull
db.once('open', () => console.log("Database Connected successfully"));

module.exports = db;