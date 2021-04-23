// we will create actions for different routes over here in this file
// and then export them to routes (index.js)

module.exports.home = function(req, res) {

    return res.render('home', {
        title : "Home"
    });
}