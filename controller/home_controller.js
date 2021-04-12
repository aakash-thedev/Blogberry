// we will create actions for different routes over here in this file
// and then export them to routes (index.js)

module.exports.home = function(req, res) {

    // to access cookies
    console.log(req.cookies);

    // to modify cookies on browser
    res.cookie('Aakash', 08);

    return res.render('home', {
        title : "Home"
    });
}