// we will create actions for different routes over here in this file
// and then export them to routes (index.js)

const home = function(req, res) {
    return res.end('<h1> Express Server is up & running </h1>');
}

const test = function(req, res) {
    return res.end('<h1> Test Server Running </h1>');
}

module.exports.home = home;
module.exports.test = test;